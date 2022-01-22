import api from '../../core/firebase'
import { Dispatch } from 'redux';
import { ActionType } from "./constants";
import { IAction } from './taskStore';
import { ITask } from './entity';

export const getList = () => async (dispatch: Dispatch<IAction>) =>  {
  const data = await api.fetchAll<ITask>()

  dispatch({ type: ActionType.FETCH_ALL, payload: data})
}

export  const  createTask = (newTask: ITask) => async (dispatch: Dispatch<IAction>) => {
  const documentData = await api.createTask<ITask>(newTask)
  // fetch data with id
  const data = await api.fetchOne<ITask>(documentData?.id) 
  dispatch({ type: ActionType.CREATE, payload:  { id: documentData?.id, ...data} })
}

export const updateTask = (task: ITask) => async (dispatch: Dispatch<IAction>) => {
  if (!task.id) return;
  await api.updateTask(task)
  // fetch with id
  const data = await api.fetchOne<ITask>(task.id)

  dispatch({type: ActionType.UPDATE, payload: { id: task.id, ...data }})
}

export const updateTaskMission = (task: ITask) => async (dispatch: Dispatch<IAction>) => {
  if (!task.id) return
  await api.updateTaskMission(task)
  const data = await api.fetchOne<ITask>(task.id)

  dispatch({type: ActionType.UPDATE, payload: { id: task.id, ...data }})
}
export const deleteTask  = (id: string) => async (dispatch: Dispatch<IAction>) => {
  await api.deleteTask(id)

  dispatch({type: ActionType.DELETE, payload: { id: id } })
}