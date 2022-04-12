import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTasks(state, action) {
            state.data = action.payload.data;
        }
    }
});

export const { fetchTasks } = taskSlice.actions;

export default taskSlice.reducer
