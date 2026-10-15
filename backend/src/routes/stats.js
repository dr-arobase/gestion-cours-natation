import express from 'express';
import Swimmer from '../models/Swimmer.js';
import Lifeguard from '../models/Lifeguard.js';
import SwimmingGroup from '../models/SwimmingGroup.js';
import User from '../models/User.js';
import { authenticateToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Swimming statistics
router.get('/swimming/progression', authenticateToken, checkPermission('canViewStats'), async (req, res) => {
  try {
    const swimmers = await Swimmer.find({ active: true });
    
    const levelDistribution = swimmers.reduce((acc, swimmer) => {
      acc[swimmer.level] = (acc[swimmer.level] || 0) + 1;
      return acc;
    }, {});

    const progressionData = swimmers.map(swimmer => ({
      name: `${swimmer.firstName} ${swimmer.lastName}`,
      level: swimmer.level,
      skillsAchieved: swimmer.skills.filter(s => s.achieved).length,
      totalSkills: swimmer.skills.length,
      progressionCount: swimmer.progression.length
    }));

    res.json({
      levelDistribution,
      progressionData,
      totalSwimmers: swimmers.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Attendance rate
router.get('/swimming/attendance', authenticateToken, checkPermission('canViewStats'), async (req, res) => {
  try {
    const swimmers = await Swimmer.find({ active: true }).populate('group');
    
    const attendanceByGroup = {};
    
    for (const swimmer of swimmers) {
      const groupName = swimmer.group?.name || 'Sans groupe';
      if (!attendanceByGroup[groupName]) {
        attendanceByGroup[groupName] = {
          total: 0,
          present: 0,
          absent: 0,
          rate: 0
        };
      }
      
      const total = swimmer.attendance.length;
      const present = swimmer.attendance.filter(a => a.present).length;
      
      attendanceByGroup[groupName].total += total;
      attendanceByGroup[groupName].present += present;
      attendanceByGroup[groupName].absent += (total - present);
    }

    // Calculate rates
    Object.keys(attendanceByGroup).forEach(group => {
      const data = attendanceByGroup[group];
      data.rate = data.total > 0 ? ((data.present / data.total) * 100).toFixed(2) : 0;
    });

    res.json(attendanceByGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Success rate by level
router.get('/swimming/success-rate', authenticateToken, checkPermission('canViewStats'), async (req, res) => {
  try {
    const swimmers = await Swimmer.find({ active: true });
    
    const successByLevel = {};
    
    swimmers.forEach(swimmer => {
      if (!successByLevel[swimmer.level]) {
        successByLevel[swimmer.level] = {
          total: 0,
          withDiploma: 0,
          rate: 0
        };
      }
      
      successByLevel[swimmer.level].total++;
      if (swimmer.diplomas.length > 0) {
        successByLevel[swimmer.level].withDiploma++;
      }
    });

    // Calculate rates
    Object.keys(successByLevel).forEach(level => {
      const data = successByLevel[level];
      data.rate = ((data.withDiploma / data.total) * 100).toFixed(2);
    });

    res.json(successByLevel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lifeguard statistics
router.get('/lifeguard/success-rate', authenticateToken, checkPermission('canViewStats'), async (req, res) => {
  try {
    const lifeguards = await Lifeguard.find({ active: true });
    
    const statsByCertification = {};
    
    lifeguards.forEach(lifeguard => {
      const cert = lifeguard.certification;
      if (!statsByCertification[cert]) {
        statsByCertification[cert] = {
          total: 0,
          passed: 0,
          failed: 0,
          rate: 0
        };
      }
      
      statsByCertification[cert].total++;
      
      const lastExam = lifeguard.examScores[lifeguard.examScores.length - 1];
      if (lastExam) {
        if (lastExam.passed) {
          statsByCertification[cert].passed++;
        } else {
          statsByCertification[cert].failed++;
        }
      }
    });

    // Calculate rates
    Object.keys(statsByCertification).forEach(cert => {
      const data = statsByCertification[cert];
      const tested = data.passed + data.failed;
      data.rate = tested > 0 ? ((data.passed / tested) * 100).toFixed(2) : 0;
    });

    res.json(statsByCertification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Instructor statistics
router.get('/instructors', authenticateToken, checkPermission('canViewStats'), async (req, res) => {
  try {
    const groups = await SwimmingGroup.find().populate('instructor');
    const instructorStats = {};

    for (const group of groups) {
      if (group.instructor) {
        const instructorName = `${group.instructor.firstName} ${group.instructor.lastName}`;
        if (!instructorStats[instructorName]) {
          instructorStats[instructorName] = {
            groups: 0,
            totalStudents: 0,
            groupNames: []
          };
        }
        
        instructorStats[instructorName].groups++;
        instructorStats[instructorName].totalStudents += group.currentEnrollment;
        instructorStats[instructorName].groupNames.push(group.name);
      }
    }

    res.json(instructorStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Overall dashboard statistics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const totalSwimmers = await Swimmer.countDocuments({ active: true });
    const totalLifeguards = await Lifeguard.countDocuments({ active: true });
    const totalGroups = await SwimmingGroup.countDocuments({ active: true });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });

    // Next upcoming class
    const now = new Date();
    const groups = await SwimmingGroup.find({ active: true }).populate('instructor');
    
    res.json({
      totalSwimmers,
      totalLifeguards,
      totalGroups,
      totalInstructors,
      groups: groups.slice(0, 5) // Next 5 groups
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
