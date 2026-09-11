import { useState } from 'react'
import { FiEdit2, FiSave, FiTrash2, FiX } from 'react-icons/fi'

// Affiche la liste des tâches et transmet les actions aux cartes individuelles.
function TaskContainer({taskList,onToggleTask,onDeleteTask,onUpdateTask}) {
    // Affiche toutes les tâches sous forme de cartes espacées.
    return <>
    
                <div className="task-container">
                    <hr />
                    <h3>Liste des tâches</h3>
                </div>
                <div>
                    <ul className="task-list space-y-4 mt-4">
                        {taskList.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggleTask={onToggleTask}
                                onDeleteTask={onDeleteTask}
                                onUpdateTask={onUpdateTask}
                            />
                        ))}
                    </ul>
                </div>
            </>
}

function TaskCard({task,onToggleTask,onDeleteTask,onUpdateTask}) {
    // L'édition reste locale jusqu'à la validation de la nouvelle valeur.
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)

    // Valide le nouveau titre avant de demander sa sauvegarde au parent.
    function handleSave() {
        const cleanTitle = title.trim()
        if (!cleanTitle) return
        onUpdateTask(task.id, cleanTitle)
        setTitle(cleanTitle)
        setIsEditing(false)
    }

    function handleCancel() {
        setTitle(task.title)
        setIsEditing(false)
    }

    return (
        <li className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 sm:flex-row sm:items-center sm:justify-between" key={task.id}>
            <div className="flex min-w-0 items-center gap-3">
                                <input 
                                    type="checkbox"
                                    checked={task.done}
                                    className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
                                    onChange={() => onToggleTask(task.id)}
                                />
                {isEditing ? (
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSave()
                            if (event.key === 'Escape') handleCancel()
                        }}
                        className="min-w-0 flex-1 rounded-lg border border-indigo-300 px-3 py-2 text-slate-800 outline-none ring-4 ring-indigo-50"
                        autoFocus
                    />
                ) : (
                    <span className={`truncate text-base font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {task.title}
                    </span>
                )}
            </div>
            <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                {isEditing ? (
                    <>
                        <CardButton label="Enregistrer" onClick={handleSave} className="text-emerald-600 hover:bg-emerald-50">
                            <FiSave aria-hidden="true" />
                        </CardButton>
                        <CardButton label="Annuler" onClick={handleCancel} className="text-slate-500 hover:bg-slate-100">
                            <FiX aria-hidden="true" />
                        </CardButton>
                    </>
                ) : (
                    <CardButton label="Modifier" onClick={() => setIsEditing(true)} className="text-indigo-600 hover:bg-indigo-50">
                        <FiEdit2 aria-hidden="true" />
                    </CardButton>
                )}
                <CardButton label="Supprimer" onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:bg-red-50">
                    <FiTrash2 aria-hidden="true" />
                </CardButton>
            </div>
        </li>
    )
}

function CardButton({label,onClick,className,children}) {
    return (
        <button type="button" aria-label={label} title={label} onClick={onClick} className={`rounded-lg p-2 text-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}>
            {children}
        </button>
    )
}
export default TaskContainer;