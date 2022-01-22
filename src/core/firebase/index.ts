// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { ITask } from "../../modules/task/entity";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtNoBn17aNjc9hl358f-bxa87agqmtmG0",
  authDomain: "learn-auth-dc714.firebaseapp.com",
  projectId: "learn-auth-dc714",
  storageBucket: "learn-auth-dc714.appspot.com",
  messagingSenderId: "104512593230",
  appId: "1:104512593230:web:5a32f30609d1e7490ed21f"
};

const store = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

const taskStore = store.collection('tasks')

const api = {
  fetchAll: <T>(): Promise<T[] | firebase.firestore.DocumentData[] | undefined> =>  {
    const data =  taskStore.get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | T>) => {
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})) 
    })
    return data
  },
  fetchOne: <T>(id: string): Promise<T | firebase.firestore.DocumentData | undefined> => {
    const data = taskStore.doc(id).get().then((doc) => {
      return doc.data()
    })
    console.log("task with id: ", data)
    return data
  },
  createTask: <T>(data: ITask): Promise<T | firebase.firestore.DocumentData | undefined> => {
    return taskStore.add({
      title: data.title,
      taskMission: data.taskMission,
      isComplete: false
    })
  },
  updateTask: (data: ITask ) => {
    taskStore.doc(data.id).update({
      taskMission: data.taskMission,
      isComplete:  !data.isComplete
    })
  },
  updateTaskMission: (data: ITask ) => {
    taskStore.doc(data.id).update({
      taskMission: data.taskMission
    })
  },
  deleteTask: (id: string) => {
    taskStore.doc(id).delete()
  }
}

export default api