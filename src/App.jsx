import {useState}  from 'react'
import { FiCheckCircle, FiList, FiMenu, FiPlus, FiSettings, FiX } from 'react-icons/fi'
import { DayPicker } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import 'react-day-picker/style.css'
import TaskContainer from './Taskcontainer.jsx'
import {TaskReceiver} from './TaskReceiver.jsx'


export function App  () {
// Centralise l'état des tâches et l'état d'ouverture des éléments de l'interface.
const[isTaskReceiverOpen, setTaskReceiverOpen] = useState(false)
const[taskList, setTaskList] = useState([])
const[notice, setNotice] = useState('')
const[isMenuOpen, setMenuOpen] = useState(false)
const[selectedDate, setSelectedDate] = useState(new Date())
const[taskFilter, setTaskFilter] = useState('all')
const utilisateur = 'utilisateur'

// Calcule la vue filtrée sans modifier la liste complète des tâches.
const visibleTasks = taskList.filter((task) => {
  if (taskFilter === 'active') return !task.done
  if (taskFilter === 'completed') return task.done
  return true
})

function handleAddTask(task){
  // Ajoute la nouvelle tâche puis ferme la fenêtre de saisie.
  setTaskList([
    ...taskList,
    {
      id: crypto.randomUUID(),
      title: task,
      done: false
    }
  ])
  setTaskReceiverOpen(false)
  setNotice('Tâche enregistrée')
}

function handleToggleTask(id) {
  // Inverse le statut terminé de la tâche sélectionnée.
    setTaskList(
        taskList.map((task) =>
            task.id === id
                ? { ...task, done: !task.done }
                : task
        )
    );
}

  function handleDeleteTask(id) {
    // Retire la tâche sans modifier les autres éléments de la liste.
    setTaskList(taskList.filter((task) => task.id !== id));
  }

  function handleUpdateTask(id, title) {
    // Remplace uniquement le titre de la tâche modifiée.
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  }

 return <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
          <div className="mx-auto flex min-h-screen max-w-[1440px]">
            {/* Le menu reste masqué jusqu'à l'action de l'utilisateur. */}
            <button type="button" onClick={() => setMenuOpen(true)} className="fixed left-4 top-4 z-20 rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm hover:bg-slate-50" aria-label="Ouvrir le menu">
              <FiMenu aria-hidden="true" />
            </button>
            {isMenuOpen && <div className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white px-5 py-8 transition-transform duration-200 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex items-center gap-3 px-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">T</div>
                <div className="flex-1"><p className="font-bold text-slate-950">Taskplus</p><p className="text-xs text-slate-400">Mon espace</p></div>
                <button type="button" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Fermer le menu"><FiX /></button>
              </div>
              <nav className="mt-12 space-y-2" aria-label="Navigation principale">
                <a href="#tasks" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"><FiList aria-hidden="true" />Tâches</a>
                <a href="#settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"><FiSettings aria-hidden="true" />Paramètres</a>
              </nav>
            </aside>
            <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
              <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-sm font-semibold text-indigo-600">Mardi 4 septembre 2026</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Bonjour, {utilisateur}</h1></div>
                <Button titre="Nouvelle tâche" onClick={()=>setTaskReceiverOpen(true)}><FiPlus aria-hidden="true" /></Button>
              </header>
              <section id="tasks" className="mt-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-slate-950">Mes tâches</h2>
                  <div className="flex flex-wrap gap-2" aria-label="Filtrer les tâches">
                    {[
                      { value: 'all', label: 'Toutes', activeClass: 'bg-indigo-600 text-white' },
                      { value: 'active', label: 'À faire', activeClass: 'bg-amber-400 text-slate-950' },
                      { value: 'completed', label: 'Terminées', activeClass: 'bg-emerald-500 text-white' },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        type="button"
                        onClick={() => setTaskFilter(filter.value)}
                        className={`rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:border-slate-300 ${taskFilter === filter.value ? filter.activeClass : 'bg-white text-black'}`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
                <TaskContainer taskList={visibleTasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
              </section>
            </div>
            <aside className="hidden w-80 shrink-0 border-l border-slate-200 bg-white px-6 py-10 xl:block">
              <section id="calendar" aria-labelledby="calendar-title">
                <h2 id="calendar-title" className="text-lg font-bold text-slate-950">Calendrier</h2>
                <div className="mt-4 rounded-xl border border-slate-100 p-2">
                  {/* DayPicker fournit la navigation mensuelle et la sélection de date. */}
                  <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} locale={fr} showOutsideDays fixedWeeks className="mx-auto" />
                </div>
              </section>
              <section id="progress" className="mt-12 border-t border-slate-100 pt-8" aria-labelledby="progress-title">
                <h2 id="progress-title" className="text-lg font-bold text-slate-950">Progression</h2><div className="mt-6 flex items-center gap-4"><div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-100"><span className="text-lg font-bold text-slate-950">{taskList.length ? Math.round(taskList.filter((task) => task.done).length / taskList.length * 100) : 0}%</span></div><div><p className="text-2xl font-bold text-slate-950">{taskList.filter((task) => task.done).length}/{taskList.length}</p><p className="text-sm text-slate-500">tâches terminées</p></div></div>
              </section>
            </aside>
          </div>
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

  