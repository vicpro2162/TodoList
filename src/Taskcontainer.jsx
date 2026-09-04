function TaskContainer({taskList,onToggleTask}) {
    return <>
    
                <div className="task-container">
                    <h3>Liste des tâches</h3>
                </div>
                <div>
                    <ul className="task-list">
                        {taskList.map((task) => (
                            <li key={task.id}>
                                <input 
                                    type="checkbox"
                                    checked={task.done}
                                    style={{cursor: "pointer"}}
                                    onChange={() => onToggleTask(task.id)}
                                />
                                    {task.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
    
}
export default TaskContainer;