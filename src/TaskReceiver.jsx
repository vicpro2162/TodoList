import React from 'react'
import {Button,} from './App.jsx'

export const TaskReceiver = () => {
    return(
        <div className="task-receiver">
            <h3><strong>Tâche à ajouter</strong></h3>
            <TaskInput />
            <ButtonContainer />
        </div>
    )
}

export const TaskInput = () => {
    return <input type="text" placeholder="Entrez une tâche"/>

}

export const ButtonContainer =() => {
    return (
        <div className='button-container'>
            <Button className="cancel" titre="Annuler" />
            <Button className="confirm" titre="Valider" />
        </div>
    )
}