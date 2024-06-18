import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { db } from '../services/database';

const TodoList = () => {
  const [task,setTask] = useState('');
  const [list,setList] = useState([]);
  const {currentUser} = useContext(UserContext);
  const userCollectionRef =query(collection(db,'users'),where('email','==',currentUser.email));

  const [screen, setScreen] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  
  useEffect(() => {
    const unsub = onSnapshot(userCollectionRef,snapshot=>{
      const data = snapshot.docs.map((doc)=>{
        return {
          id:doc.id,
          userName:doc.data().userName,
          todoList:doc.data().todoList || []
        }
      })
      setList(data);
    })
    return () => {
      unsub();
    }
  }, [])
  
  
  const addTaskHandler = async()=>{
    const userId = list[0].id;
    const userDoc = doc(db,'users',userId)
    const currentList = list[0].todoList;
    if (currentList.includes(task)) {
      alert('Task already exists');
      setTask('');
      return;
    }
    const newList = [...list[0].todoList,task]

    await updateDoc(userDoc,{
      todoList : newList
    })
    setTask('')
  }

  const deleteHandler = async(name)=>{
    const listTodo = list[0].todoList
    const userId = list[0].id;
    const userDoc = doc(db,'users',userId)
    for(var item=0 ;item <list[0].todoList.length ;item++){
      if( listTodo[item] === name) {
        list[0].todoList.splice(item,1);
      }
    }
    await updateDoc(userDoc,{
      todoList : listTodo
    })
  }

  const editHandler = (task) => {
    setScreen(true);
    setEditTask(task);
    setTaskToEdit(task);
  };

  const editTaskHandler = async()=>{
    const userId = list[0].id;
    const userDoc = doc(db, 'users', userId);
    const updatedList = list[0].todoList.map(item => item === taskToEdit ? editTask : item);
    await updateDoc(userDoc, {
      todoList: updatedList
    });
    setScreen(false);
    setEditTask('');
    setTaskToEdit(null);
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
                    <div>
                      <div>{item} </div>
                      <button onClick={()=>editHandler(item)}>Edit</button>
                      <button onClick={()=>deleteHandler(item)}>Delete</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {screen && (
        <div>
          <input type='text' placeholder='Edit task' value={editTask} onChange={(e) => setEditTask(e.target.value)} />
          <button onClick={editTaskHandler}>Done</button>
        </div>
      )}
    </div>
  )
}

export default TodoList