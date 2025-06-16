const express = require('express');
const router = express.Router();
const Training = require('../models/Training');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Get all trainings
router.get('/', async (req, res) => {
    try {
        const trainings = await Training.find().sort({ date: 1 });
        res.json(trainings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a training
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, startDate, endDate, instructor, location, maxParticipants } = req.body;

        const newTraining = new Training({
            title,
            description,
            startDate,
            endDate,
            instructor,
            location,
            maxParticipants,
            createdBy: req.user.id
        });

        const training = await newTraining.save();
        res.json(training);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a training
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, startDate, endDate, instructor, location, maxParticipants } = req.body;

        let training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ msg: 'Training not found' });
        }

        training = await Training.findByIdAndUpdate(
            req.params.id,
            { title, description, startDate, endDate, instructor, location, maxParticipants },
            { new: true }
        );

        res.json(training);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a training
router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('Delete request received for ID:', req.params.id);
        
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid training ID format' });
        }

        // Try to delete directly
        const result = await Training.deleteOne({ _id: req.params.id });
        console.log('Delete result:', result);

        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: 'Training not found' });
        }

        res.json({ msg: 'Training deleted successfully' });
    } catch (err) {
        console.error('Error in delete training:', err);
        res.status(500).json({ 
            msg: 'Server Error', 
            error: err.message
        });
    }
});

module.exports = router; 