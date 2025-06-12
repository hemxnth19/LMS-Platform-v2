import express from 'express';
import { Training } from '../models/Training';
import { checkRole } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Get all trainings
router.get('/trainings', checkRole(['admin']), async (req, res) => {
  try {
    const trainings = await Training.find().sort({ startDate: 1 });
    res.json({ trainings });
  } catch (error) {
    console.error('Error fetching trainings:', error);
    res.status(500).json({ message: 'Error fetching trainings' });
  }
});

// Create new training
router.post('/trainings', checkRole(['admin']), async (req, res) => {
  try {
    console.log('Received training data:', req.body);
    console.log('User from request:', req.user);
    
    const {
      title,
      description,
      instructor,
      startDate,
      endDate,
      location,
      maxParticipants,
      type
    } = req.body;

    // Validate required fields
    if (!title || !description || !instructor || !startDate || !endDate || !location || !maxParticipants || !type) {
      console.log('Missing fields:', { title, description, instructor, startDate, endDate, location, maxParticipants, type });
      return res.status(400).json({
        message: 'Missing required fields',
        fields: {
          title: !title ? 'Title is required' : undefined,
          description: !description ? 'Description is required' : undefined,
          instructor: !instructor ? 'Instructor is required' : undefined,
          startDate: !startDate ? 'Start date is required' : undefined,
          endDate: !endDate ? 'End date is required' : undefined,
          location: !location ? 'Location is required' : undefined,
          maxParticipants: !maxParticipants ? 'Maximum participants is required' : undefined,
          type: !type ? 'Training type is required' : undefined
        }
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Create new training
    const training = new Training({
      title,
      description,
      instructor,
      startDate: start,
      endDate: end,
      location,
      maxParticipants: Number(maxParticipants),
      type,
      currentParticipants: 0,
      createdBy: new mongoose.Types.ObjectId(req.user._id)
    });

    console.log('Attempting to save training:', training);

    // Save to database
    const savedTraining = await training.save();
    console.log('Training saved successfully:', savedTraining);

    res.status(201).json({
      message: 'Training created successfully',
      training: savedTraining
    });
  } catch (error) {
    console.error('Detailed error creating training:', error);
    // Log the full error object
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    } else {
      console.error('Unknown error type:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

export default router; 