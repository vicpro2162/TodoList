import {useEffect, useRef} from 'react'
import {useState} from 'react'
import {Button,} from './App.jsx'

export function TaskReceiver({onCancel,onConfirm}) {
    // Contrôle le formulaire d'ajout et son message de validation.
    const [task, setTask] = useState("")
    const [error, setError] = useState("")
    function handleConfirm() {
        if (task.trim() === ""){
            setError('Veuillez entrer une tâche valide.')
        }
        else{
            setError("")
            onConfirm(task)
        }
    }
    return(
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl sm:p-7">

            <h3 className="text-xl font-bold tracking-tight text-slate-950">
                <strong>Tâche à ajouter</strong>
            </h3>
            <p className="mt-2 text-sm text-slate-500">Notez la prochaine action à garder en tête.</p>

            <TaskInput 
                task={task}
                setTask={setTask}
            />
            {error && <p role="alert" className="mt-2 text-sm font-medium text-red-600">{error}</p>}

            <ButtonContainer
                onCancel={onCancel}
                onConfirm={handleConfirm} 
            />

        </div>
        </div>
    )
}

export function TaskInput({task,setTask}) {
    // Place automatiquement le curseur dans le champ à l'ouverture.
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function handleChange(e){
        setTask(e.target.value);
    }
    return <input
                placeholder="Entrez une tâche"
                value={task}
                onChange={handleChange}
                ref={inputRef}
                aria-label="Nom de la tâche"
                className="mt-7 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
            />
    
    


}

export function ButtonContainer ({onCancel,onConfirm}) {
    // Regroupe les deux actions du formulaire.
    return (
        <div className='mt-6 flex justify-end gap-3'>

            <Button 
                className="bg-slate-100 text-slate-700 shadow-none hover:bg-slate-200" titre="Annuler" 
                onClick = {onCancel} 
            />

            <Button 
                className="bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700" titre="Valider"
                onClick ={onConfirm}/>
        </div>
    )
}