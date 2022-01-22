import { ActionType } from "./constants";
import { ITask } from './entity'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

interface IActionTask {
  type: ActionType.UPDATE | ActionType.DELETE | ActionType.CREATE
  payload: ITask | undefined | firebase.firestore.DocumentData
}


interface IActionTaskFetchAll {
  type: ActionType.FETCH_ALL
  payload: ITask[] | undefined | firebase.firestore.DocumentData[]
}
export type IAction = IActionTask | IActionTaskFetchAll

export const taskStore = (state = [], action: IAction) => {
  switch(action.type) {
    case ActionType.FETCH_ALL: 
      if (!action.payload) return state
      return [...action.payload]
    case ActionType.CREATE:
      console.log("payload in create action", action.payload)
      // @ts-ignore
      return [...state, action.payload] // object
    case ActionType.UPDATE:
      console.log("payload in update action: ", action.payload)
      // @ts-ignore
      return state.map((task) => task.id === action.payload.id ? action.payload : task)
    case ActionType.DELETE:
      // @ts-ignore
      return state.filter((task) => task.id !== action.payload.id)
    default:
      return state
  }
} 