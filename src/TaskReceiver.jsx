import React from 'react'
import {useState} from 'react'
import {Button,} from './App.jsx'

export function TaskReceiver({onCancel,onConfirm}) {
    const [task, setTask] = useState("")
    return(
        <div className="task-receiver">
            <h3><strong>Tâche à ajouter</strong></h3>
            <TaskInput />
            <ButtonContainer
            onCancel={onCancel}
            onConfirm={onConfirm}
            />
        </div>
    )
}

export function TaskInput() {
    return <input
            placeholder="Entrez une tâche"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            />


}

export function ButtonContainer ({onCancel,onConfirm}) {
    return (
        <div className='button-container'>

            <Button 
                className="cancel" titre="Annuler" 
                onClick = {onCancel} 
            />

            <Button 
                className="confirm" titre="Valider"
                onClick ={onConfirm}/>
        </div>
    )
}