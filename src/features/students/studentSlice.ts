import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchStudent } from './studentAPI';
import { RootState } from '../../app/store';

export interface ClassState {
  Students: Array<string>;
  Name: string;
}
export interface StudentState {
  entities: Array<ClassState>;
  status: 'idle' | 'loading' | 'failed';
}

const studentsAdapter = createEntityAdapter()


const initialState: StudentState = studentsAdapter.getInitialState({
  entities: [],
  status: 'idle'
})


export const fetchStudentAsync = createAsyncThunk(
  'students/fetchStudent',
  async (name: string) => {
    const response = await fetchStudent(name);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);


export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
      
      logout: (state) => {
        state.entities = [];
        state.status = "idle";
      },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudentAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchStudentAsync.fulfilled, (state, action) => {
          state.entities = action.payload;
          state.status = 'idle';
        })
        .addCase(fetchStudentAsync.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });

  
  export const { logout } = studentSlice.actions;


  export default studentSlice.reducer;



  const selectClass = (state:RootState) => state.student.entities;

  const getStatus = (state:RootState) => state.student.status;
  
  export const selectClasses = createSelector(selectClass,
    entities => entities.map((entity:ClassState) => entity)
  )

  export const selectStatus = createSelector(getStatus,
    (status: string) => status
  )

  
