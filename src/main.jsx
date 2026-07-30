import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App,Button} from './App.jsx'
import TaskContainer from './Taskcontainer.jsx'
import {TaskReceiver,TaskInput} from './TaskReceiver.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TaskContainer />
    <TaskReceiver />
    
  </StrictMode>,
)
