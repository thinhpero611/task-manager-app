import React from 'react';
import Task from '../Task'
import { List } from 'antd'



const ListTask = ({ tasks }) => {
  return (
    <>
      <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={task  => (
        <List.Item>
             {/*@ts-ignore*/}
          <Task task={task} />
        </List.Item>
      )}
    />
  </>
  )
}

export default ListTask
