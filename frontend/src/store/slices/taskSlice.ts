import { createSlice } from '@reduxjs/toolkit';
import { TaskEntity } from '../../common/entity';

type State = {
  tasks: TaskEntity[];
};

const initialState: State = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
