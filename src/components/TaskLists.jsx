import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import './components/SignOut'

function App() {

    const [tasks, setTasks] = useState([]);
  
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
  
    const fetchTasks = async () => {
      const collectionRef = collection(db, 'tasks');
      const querySnapshot = await getDocs(collectionRef);
      const tasks = querySnapshot.docs.map((task) => ({
        id: task.id,
        ...task.data()
      }))
          setTasks(tasks)
    }
      useEffect(() => {
      fetchTasks();
    }, []);
  
    const deleteTask = async (id) => {
  
      const docRef = doc(db, 'tasks', id)
      await deleteDoc(docRef)
  
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id))
    }
  
    const addTask = async (e) => {
      e.preventDefault();
      const collectionRef = collection(db, 'tasks');
      await addDoc(collectionRef, {
        title: title,
        body: body,
        status: 'pending'
      })
      setTitle('')
      setBody('')
      alert('Task added')
    }
  
    const handleStatus = async (id) => {
      try {
        const itemRef = doc(db, 'tasks', id);
        const currentTask = await getDoc(itemRef);
        const currentStatus = currentTask.data().status;
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
  
        await updateDoc(itemRef, {
          status: newStatus,
        });
  
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      } catch (error) {
        console.log(error)
      }
  
    }
  
    return (
      <>
        <div className="formStyle">
          <h3>Add Task</h3>
          <form onSubmit={addTask}>
            <input type="text" name="title" id="title" placeholder="Task Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
            <br></br>
            <br></br>
            <textarea name="desc" id="desc" placeholder="Task Description" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
            <br></br>
            <br></br>
            <button type="submit" onClick={() => { setTimeout(() => { window.location.reload() }, 1500) }}>Add task</button>
          </form>
        </div>
  
        {
          tasks.map((task) => (
            <div key={task.id}>
              <div>
                Task title: {task.title}
              </div>
              <div>
                Task body: {task.body}
              </div>
              <div>
                Task status
                <button onClick={() => {handleStatus(task.id)}}>
                  {task.status}
                </button>
              </div>
              <button onClick={() => deleteTask(task.id)}>
                Delete task
              </button>
            </div>
  
          ))
        }
      </>
    )
  }
  
  export default App