import express from 'express';
import User from '../models/User.js';
import Swimmer from '../models/Swimmer.js';
import Lifeguard from '../models/Lifeguard.js';
import SwimmingGroup from '../models/SwimmingGroup.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all users with roles and permissions
router.get('/users', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ lastName: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user roles and permissions
router.put('/users/:id/permissions', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { role, permissions } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, permissions },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Database backup info
router.get('/backup/info', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const stats = {
      swimmers: await Swimmer.countDocuments(),
      lifeguards: await Lifeguard.countDocuments(),
      groups: await SwimmingGroup.countDocuments(),
      users: await User.countDocuments(),
      lastBackup: new Date() // In production, this would come from actual backup system
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export all data
router.get('/export/all', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const swimmers = await Swimmer.find();
    const lifeguards = await Lifeguard.find();
    const groups = await SwimmingGroup.find();
    const users = await User.find().select('-password');

    const exportData = {
      exportDate: new Date(),
      swimmers,
      lifeguards,
      groups,
      users
    };

    res.json(exportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle group active status
router.put('/groups/:id/toggle', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const group = await SwimmingGroup.findById(req.params.id);
    group.active = !group.active;
    await group.save();
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk message to instructors (placeholder - would need email service)
router.post('/message/instructors', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { subject, message } = req.body;
    const instructors = await User.find({ role: 'instructor' });
    
    // In production, this would send emails
    res.json({
      message: 'Messages envoyés',
      recipients: instructors.length,
      instructors: instructors.map(i => ({ 
        name: `${i.firstName} ${i.lastName}`, 
        email: i.email 
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get system settings
router.get('/settings', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    // In production, these would come from a Settings collection
    const settings = {
      maxGroupSize: 12,
      sessionDuration: 10, // weeks
      autoReminders: true,
      certificateTemplate: 'default',
      language: 'fr',
      timezone: 'America/Montreal'
    };
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update system settings
router.put('/settings', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    // In production, this would update a Settings collection
    res.json({ message: 'Paramètres mis à jour', settings: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
