import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Checkbox, Typography } from 'antd'
import { TagsFilled, DeleteOutlined, HighlightOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask, updateTaskMission } from '../../modules/task/repository';

const { Text, Title, Paragraph } = Typography
const Task = ({ task }) => {
  const [ isChecked, setIsChecked ] = useState(task.isComplete)
  const [ editText, setEditText ] = useState(task.taskMission)
  const dispatch = useDispatch()
  let initialValue = useRef(false);

  const handleChange = () => {
    // update isComplete field
    dispatch(updateTask({ ...task, isComplete: isChecked}))
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    // update taskMission field
    if (!initialValue.current) {
      initialValue.current = true 
      return
    }
    console.log('initail render')
    dispatch(updateTaskMission({ ...task, taskMission: editText}))
  }, [editText]);
  
  return (
    <>
    {/*@ts-ignore*/}
      <Card style={{minHeight: 220}}>
        <Title level={3}><TagsFilled /> {task.title ? task.title : 'No Title'}</Title>
        <Paragraph
          editable={{
            icon: <HighlightOutlined />,
            tooltip: 'click to edit text',
            onChange: setEditText
          }}>{editText}
        </Paragraph>
          {/* {isChecked ? 
            <Text delete>{editText}</Text> :
            <Text type="secondary">{editText}</Text>
          } */}
        <Checkbox 
          checked={isChecked}
          onChange={handleChange}
        >
        {isChecked ? 
          <Text type="success">finished</Text> :
          <Text type="warning">i'm waiting it -.-</Text>
        }
        </Checkbox>
        <Button onClick={() => dispatch(deleteTask(task.id))}>
          Delete <Text type="danger"><DeleteOutlined /></Text>
        </Button>
      </Card>
    </>
  )
}

export default Task;
