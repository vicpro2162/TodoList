import {useState}  from 'react'
import { FiCheckCircle, FiPlus,  } from 'react-icons/fi'
import TaskContainer from './Taskcontainer.jsx'
import {TaskReceiver} from './TaskReceiver.jsx'


export function App  () {
const[isTaskReceiverOpen, setTaskReceiverOpen] = useState(false)
const[taskList, setTaskList] = useState([])
const[notice, setNotice] = useState('')

function handleAddTask(task){
  setTaskList([
    ...taskList,
    {
      id: taskList.length + 1,
      title: task,
      done: false
    }
  ])
  setTaskReceiverOpen(false)
  setNotice('Tâche enregistrée')
}

function handleToggleTask(id) {
    setTaskList(
        taskList.map((task) =>
            task.id === id
                ? { ...task, done: !task.done }
                : task
        )
    );
}

 return <main className="min-h-screen bg-[#f7f8fc] px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-5xl">
            <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Mes tâches</h1>
              </div>
              <Button titre="Nouvelle tâche" onClick={()=>setTaskReceiverOpen(true)}><FiPlus aria-hidden="true" /></Button>
            </header>
            <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Résumé">
              <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-200"><div className="flex items-center justify-between"><span className="text-sm font-medium text-indigo-100">À faire aujourd'hui</span><FiCheckCircle className="text-xl text-indigo-200" aria-hidden="true" /></div><p className="mt-5 text-4xl font-bold">{taskList.length}</p><p className="mt-1 text-sm text-indigo-100">{taskList.length === 1 ? 'tâche active' : 'tâches actives'}</p></div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="text-sm font-medium text-slate-500">Progression</span><p className="mt-5 text-4xl font-bold text-slate-900">{taskList.filter((task) => task.done).length}/{taskList.length}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{width: taskList.length ? `${taskList.filter((task) => task.done).length / taskList.length * 100}%` : '0%'}} /></div></div>
            </section>

          <TaskContainer 
          taskList={taskList} 
          onToggleTask={handleToggleTask}
          />
            { 
              isTaskReceiverOpen && ( 
                <TaskReceiver 
                  onCancel ={() => setTaskReceiverOpen(false)} 
                  onConfirm = {handleAddTask}
                /> 
              ) 
            }
            {notice && (
              <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/10 p-4 backdrop-blur-md">
                <div role="status" className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-4 text-sm font-semibold text-emerald-700">
                  <FiCheckCircle className="text-lg" aria-hidden="true" />
                  <span>{notice}</span>
                  <button type="button" onClick={() => setNotice('')} className="ml-2 text-emerald-400 hover:text-emerald-700" aria-label="Fermer la notification">×</button>
                </div>
              </div>
            )}
    
          </div>
        </main>
                    
}

export function Button ({titre,className="",onClick,children}) {
  
  return  ( 
    <button 
      onClick={onClick} 
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}>
      {children}
      {titre}
    </button> 
  )
}

  