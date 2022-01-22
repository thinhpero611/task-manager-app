import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules';
import { createTask, getList } from './modules/task/repository';
import { ITask } from './modules/task/entity';
import ListTask from './component/ListTask'
import { Divider, Layout, Badge } from 'antd'
import 'antd/dist/antd.css'
import Title from 'antd/lib/typography/Title';

const { Header, Footer, Sider, Content } = Layout;

const initialState = {
  taskMission: "",
  title: ""
}
const  App = () => {
  const [ state, setState ] = useState(initialState)
  const dispatch = useDispatch()
  const tasks: ITask[] = useSelector((state: RootState) => state.task)

  useEffect(() => {
    dispatch(getList())
    console.log("after dispatch", tasks)
  }, [dispatch])

  const handleChange = (e) => {
    setState({...state, [e.target.name] : e.target.value })
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    console.log("handle add task", state)
    dispatch(createTask(state))
    setState(initialState)
  }

  return (
    <>
      <Layout>
        <Header>
          <Title level={1} style={{color: "white", textAlign: "center"}}>Task Manager App</Title>
        </Header>
        <Content>
          <Divider>Just keep Going Everyday ^.^</Divider>
          <ListTask tasks={tasks} />
          <Divider>
            <form onSubmit={handleAddTask}>
              <input type="text" value={state.title} placeholder="Enter titlte ..." onChange={handleChange} name="title" /> 
              <input type="text" value={state.taskMission} placeholder='Add new task ...' onChange={handleChange} name="taskMission"/>
              <button>Add task</button>
            </form>
          </Divider>
          <Divider orientation="right">
            You have {tasks.filter((task) => !task.isComplete).length} 
            <Badge.Ribbon text="tasks to finished" color="magenta">
            </Badge.Ribbon>
          </Divider>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default App;
