import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Employee } from '../../types';

interface EmployeesState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action: PayloadAction<Employee[]>) => {
      state.loading = false;
      state.employees = action.payload;
      state.error = null;
    },
    fetchEmployeesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectEmployee: (state, action: PayloadAction<Employee>) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      if (state.selectedEmployee?.id === action.payload.id) {
        state.selectedEmployee = action.payload;
      }
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      if (state.selectedEmployee?.id === action.payload) {
        state.selectedEmployee = null;
      }
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  selectEmployee,
  clearSelectedEmployee,
  updateEmployee,
  addEmployee,
  deleteEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer; 