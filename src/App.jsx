import {useState}  from 'react'
import TaskContainer from './Taskcontainer.jsx'
import {TaskReceiver} from './TaskReceiver.jsx'


export function App  () {
const[isTaskReceiverOpen, setTaskReceiverOpen] = useState(false)

 return <>
          <div className="AppHeader">
            <h2>TodoList</h2>
            <Button titre="+ New Task" onClick={()=>setTaskReceiverOpen(true)}/>
          </div>

          < TaskContainer />
          { isTaskReceiverOpen && ( 
            <TaskReceiver 
            onCancel ={() => setTaskReceiverOpen(false)} 
            onConfirm = {() => setTaskReceiverOpen(false)}/> ) }
    
        </>
                    
}

export function Button ({titre,className="",onClick}) {
  
  return  ( 
  <div className="Button">
    <button onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}>
      {titre}
    </button> 
  </div> )
}

  