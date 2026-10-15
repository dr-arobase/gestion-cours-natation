import express from 'express';
import Lifeguard from '../models/Lifeguard.js';
import Equipment from '../models/Equipment.js';
import { authenticateToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all lifeguards
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { certification, status, search } = req.query;
    let query = { active: true };

    if (certification) query.certification = certification;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const lifeguards = await Lifeguard.find(query).sort({ lastName: 1 });
    res.json(lifeguards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single lifeguard
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findById(req.params.id);
    if (!lifeguard) {
      return res.status(404).json({ message: 'Sauveteur non trouvé' });
    }
    res.json(lifeguard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create lifeguard
router.post('/', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = new Lifeguard(req.body);
    await lifeguard.save();
    res.status(201).json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lifeguard
router.put('/:id', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete lifeguard
router.delete('/:id', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    await Lifeguard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sauveteur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register for test
router.post('/:id/test-registration', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findById(req.params.id);
    lifeguard.testRegistrations.push(req.body);
    await lifeguard.save();
    res.json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add exam score
router.post('/:id/exam-score', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findById(req.params.id);
    lifeguard.examScores.push({
      ...req.body,
      evaluatedBy: req.user._id
    });
    await lifeguard.save();
    res.json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark attendance
router.post('/:id/attendance', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findById(req.params.id);
    lifeguard.attendance.push(req.body);
    await lifeguard.save();
    res.json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add certification
router.post('/:id/certification', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const lifeguard = await Lifeguard.findById(req.params.id);
    lifeguard.certifications.push(req.body);
    await lifeguard.save();
    res.json(lifeguard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Equipment routes
router.get('/equipment/all', authenticateToken, async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ name: 1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/equipment', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/equipment/:id', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/equipment/:id', authenticateToken, checkPermission('canManageLifeguards'), async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Équipement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
