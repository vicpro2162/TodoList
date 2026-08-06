import React from 'react'
import {Button,} from './App.jsx'

export function TaskReceiver() {
    return(
        <div className="task-receiver">
            <h3><strong>Tâche à ajouter</strong></h3>
            <TaskInput />
            <ButtonContainer />
        </div>
    )
}

export function TaskInput() {
    return <input type="text" placeholder="Entrez une tâche"/>

}

export function ButtonContainer () {
    return (
        <div className='button-container'>
            <Button className="cancel" titre="Annuler" />
            <Button className="confirm" titre="Valider" />
        </div>
    )
}