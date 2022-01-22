import { combineReducers } from "redux";
import { taskStore } from './task/taskStore'

export const reducers = combineReducers({
  task: taskStore
})

export type RootState = ReturnType<typeof reducers>

