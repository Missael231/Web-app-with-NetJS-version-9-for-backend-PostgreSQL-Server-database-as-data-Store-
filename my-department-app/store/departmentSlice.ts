import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Department } from '../types'; // Assuming an interface for Department

// Define an interface for the department state
interface DepartmentState {
  departments: Department[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: null,
  loading: false,
  error: null,
};


export const fetchDepartments = createAsyncThunk<Department[]>(
  'departments/fetch',
  async () => {
   
    const response = await fetch('http://localhost:3000/departments');
    return await response.json();
  }
);

export const createDepartment = createAsyncThunk<Department, Department>(
  'departments/create',
  async (department) => {
   
    const response = await fetch('http://localhost:3000/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(department),
    });
    return await response.json();
  }
);

export const updateDepartment = createAsyncThunk<Department, Department>(
  'departments/update',
  async (department) => {

    const response = await fetch(`http://localhost:3000/departments/${department.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(department),
    });
    return await response.json();
  }
);

export const deleteDepartment = createAsyncThunk<number, number>(
  'departments/delete',
  async (id) => {
    
    await fetch(`http://localhost:3000/departments/${id}`, {
      method: 'DELETE',
    });
    return id; 
  }
);

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
