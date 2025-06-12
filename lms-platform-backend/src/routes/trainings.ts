import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Training } from '../models/Training';
import { checkRole } from '../middleware/auth';

const router = express.Router();

// Get all trainings
router.get('/', checkRole(['admin', 'employee']), async (req: express.Request, res: express.Response) => {
  try {
    const trainings = await Training.find()
      .select('title description instructor startDate endDate location maxParticipants currentParticipants status type level')
      .sort({ startDate: 1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainings', error });
  }
});

// Get a specific training
router.get('/:id', checkRole(['admin', 'employee']), async (req: express.Request, res: express.Response) => {
  try {
    const training = await Training.findById(req.params.id)
      .select('title description instructor startDate endDate location maxParticipants currentParticipants status type level');
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching training', error });
  }
});

// Admin routes
router.post('/', checkRole(['admin']), async (req: Request, res: Response): Promise<void> => {
  try {
    const training = new Training(req.body);
    await training.save();
    res.status(201).json({ training });
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ message: 'Error creating training' });
  }
});

router.put('/:id', checkRole(['admin']), async (req: Request, res: Response): Promise<void> => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!training) {
      res.status(404).json({ message: 'Training not found' });
      return;
    }
    res.json({ training });
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ message: 'Error updating training' });
  }
});

router.delete('/:id', checkRole(['admin']), async (req: Request, res: Response): Promise<void> => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      res.status(404).json({ message: 'Training not found' });
      return;
    }
    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).json({ message: 'Error deleting training' });
  }
});

// Join a training
router.post('/:id/join', checkRole(['employee']), async (req: express.Request, res: express.Response) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    if (training.currentParticipants >= training.maxParticipants) {
      return res.status(400).json({ message: 'Training is full' });
    }

    const userId = new mongoose.Types.ObjectId(req.user._id);
    if (training.participants.includes(userId)) {
      return res.status(400).json({ message: 'Already registered for this training' });
    }

    training.participants.push(userId);
    training.currentParticipants += 1;
    await training.save();

    res.json({ message: 'Successfully joined training' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining training', error });
  }
});

export default router; 