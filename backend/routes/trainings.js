const express = require('express');
const router = express.Router();
const Training = require('../models/Training');
const auth = require('../middleware/auth');

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
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ msg: 'Training not found' });
        }

        await training.remove();
        res.json({ msg: 'Training removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 