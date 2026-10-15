import express from 'express';
import Swimmer from '../models/Swimmer.js';
import SwimmingGroup from '../models/SwimmingGroup.js';
import { authenticateToken, checkPermission } from '../middleware/auth.js';
import PDFDocument from 'pdfkit';
import { createObjectCsvWriter } from 'csv-writer';

const router = express.Router();

// Get all swimming groups
router.get('/groups', authenticateToken, async (req, res) => {
  try {
    const groups = await SwimmingGroup.find()
      .populate('instructor', 'firstName lastName email')
      .sort({ name: 1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create swimming group
router.post('/groups', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    console.log('POST /groups body:', req.headers['content-type'], req.body);
    const group = new SwimmingGroup(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    let safeBody;
    try { safeBody = JSON.stringify(req.body) } catch (e) { safeBody = String(req.body) }
    res.status(400).json({ message: error.message, receivedBody: safeBody });
  }
});

// Update swimming group
router.put('/groups/:id', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const group = await SwimmingGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete swimming group
router.delete('/groups/:id', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    await SwimmingGroup.findByIdAndDelete(req.params.id);
    res.json({ message: 'Groupe supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get swimmers by group
router.get('/groups/:groupId/swimmers', authenticateToken, async (req, res) => {
  try {
    const swimmers = await Swimmer.find({ group: req.params.groupId, active: true })
      .populate('group', 'name level')
      .sort({ lastName: 1 });
    res.json(swimmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all swimmers
router.get('/swimmers', authenticateToken, async (req, res) => {
  try {
    const { level, group, search } = req.query;
    let query = { active: true };

    if (level) query.level = level;
    if (group) query.group = group;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const swimmers = await Swimmer.find(query)
      .populate('group', 'name level')
      .sort({ lastName: 1 });
    res.json(swimmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single swimmer
router.get('/swimmers/:id', authenticateToken, async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id).populate('group');
    if (!swimmer) {
      return res.status(404).json({ message: 'Nageur non trouvé' });
    }
    res.json(swimmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create swimmer
router.post('/swimmers', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = new Swimmer(req.body);
    await swimmer.save();

    // Update group enrollment count
    await SwimmingGroup.findByIdAndUpdate(swimmer.group, {
      $inc: { currentEnrollment: 1 }
    });

    res.status(201).json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update swimmer
router.put('/swimmers/:id', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete swimmer
router.delete('/swimmers/:id', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id);
    if (swimmer) {
      await SwimmingGroup.findByIdAndUpdate(swimmer.group, {
        $inc: { currentEnrollment: -1 }
      });
    }
    await Swimmer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Nageur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark attendance
router.post('/swimmers/:id/attendance', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id);
    swimmer.attendance.push(req.body);
    await swimmer.save();
    res.json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Evaluate skills
router.post('/swimmers/:id/skills', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id);
    swimmer.skills.push(req.body);
    await swimmer.save();
    res.json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add progression note
router.post('/swimmers/:id/progression', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id);
    swimmer.progression.push({
      ...req.body,
      evaluatedBy: req.user._id
    });
    await swimmer.save();
    res.json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Award diploma
router.post('/swimmers/:id/diplomas', authenticateToken, checkPermission('canManageSwimmers'), async (req, res) => {
  try {
    const swimmer = await Swimmer.findById(req.params.id);
    swimmer.diplomas.push(req.body);
    await swimmer.save();
    res.json(swimmer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export group to PDF
router.get('/groups/:groupId/export/pdf', authenticateToken, checkPermission('canExportData'), async (req, res) => {
  try {
    const group = await SwimmingGroup.findById(req.params.groupId).populate('instructor');
    const swimmers = await Swimmer.find({ group: req.params.groupId, active: true });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=groupe-${group.name}.pdf`);

    doc.pipe(res);
    doc.fontSize(20).text(`Groupe: ${group.name}`, { align: 'center' });
    doc.fontSize(12).text(`Niveau: ${group.level}`);
    doc.text(`Moniteur: ${group.instructor?.firstName} ${group.instructor?.lastName}`);
    doc.moveDown();
    doc.text('Liste des nageurs:');
    doc.moveDown();

    swimmers.forEach((swimmer, index) => {
      doc.text(`${index + 1}. ${swimmer.firstName} ${swimmer.lastName} - ${swimmer.level}`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export group to CSV
router.get('/groups/:groupId/export/csv', authenticateToken, checkPermission('canExportData'), async (req, res) => {
  try {
    const swimmers = await Swimmer.find({ group: req.params.groupId, active: true });
    
    const csvWriter = createObjectCsvWriter({
      path: 'temp.csv',
      header: [
        { id: 'firstName', title: 'Prénom' },
        { id: 'lastName', title: 'Nom' },
        { id: 'level', title: 'Niveau' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Téléphone' }
      ]
    });

    await csvWriter.writeRecords(swimmers);
    res.download('temp.csv');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
