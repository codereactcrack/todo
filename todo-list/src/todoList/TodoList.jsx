import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { db } from '../services/database';

const TodoList = () => {
  const [task,setTask] = useState('');
  const [list,setList] = useState([]);
  const {currentUser} = useContext(UserContext);
  const userCollectionRef =query(collection(db,'users'),where('email','==',currentUser.email));
  useEffect(() => {
    const unsub = onSnapshot(userCollectionRef,snapshot=>{
      const data = snapshot.docs.map((doc)=>{
        return {
          id:doc.id,
          userName:doc.data().userName,
          todoList:doc.data().todoList
        }
      })
      setList(data);
    })
    return () => {
      unsub();
    }
  }, [])
  
  
  const addTaskHandler = async()=>{

  }

  return (
    <div className='todo-list'>
      <div className='add-task-container'>
        <input type='text' placeholder='Add task here...' value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
      <div className='view-task-container'>
        {list.map((data)=>{
          return(
            <div key={data.id}>
              {data.userName}
              <div className='todo-list'>
                {data.todoList.map((item)=>{
                  return (
                    <div>{item}</div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TodoList