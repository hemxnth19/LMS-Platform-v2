import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Skill } from '../../types';

interface SkillsState {
  skills: Skill[];
  userSkills: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  skills: [],
  userSkills: [],
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    fetchSkillsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSkillsSuccess: (state, action: PayloadAction<Skill[]>) => {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    fetchSkillsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserSkillsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSkillsSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.userSkills = action.payload;
      state.error = null;
    },
    fetchUserSkillsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSkillsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSkillsSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.userSkills = action.payload;
      state.error = null;
    },
    updateUserSkillsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex(skill => skill.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
  },
});

export const {
  fetchSkillsStart,
  fetchSkillsSuccess,
  fetchSkillsFailure,
  fetchUserSkillsStart,
  fetchUserSkillsSuccess,
  fetchUserSkillsFailure,
  updateUserSkillsStart,
  updateUserSkillsSuccess,
  updateUserSkillsFailure,
  addSkill,
  updateSkill,
  deleteSkill,
} = skillsSlice.actions;

export default skillsSlice.reducer; 