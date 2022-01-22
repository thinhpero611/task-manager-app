export interface ITask {
  id?: string
  title?: string
  taskMission: String
  isComplete?: boolean
}

class TaskEntity {
  id: string = ""
  taskMission: string = ""
  isComplete: boolean = false
  contructor(task: ITask ) {
    if (!task) return;
    Object.assign(this, task)
    this.isComplete = task.isComplete || false
  }
}

export default TaskEntity