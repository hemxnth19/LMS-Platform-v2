import { Request, Response } from 'express';
import Skill from '../models/Skill';

// Get all skills for a user
export const getUserSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({ userId: req.params.userId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error });
  }
};

// Get single skill
export const getSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill', error });
  }
};

// Create skill
export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Error creating skill', error });
  }
};

// Update skill
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Error updating skill', error });
  }
};

// Delete skill
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error });
  }
}; 