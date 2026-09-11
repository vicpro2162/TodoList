import cors from 'cors'
import express from 'express'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT || 3000)
const currentFile = fileURLToPath(import.meta.url)
const serverDirectory = path.dirname(currentFile)
const dataDirectory = path.join(serverDirectory, 'data')
const tasksFile = path.join(dataDirectory, 'tasks.json')

async function readTasks() {
   await mkdir(dataDirectory, { recursive: true })

   try {
      const fileContent = await readFile(tasksFile, 'utf8')
      const tasks = JSON.parse(fileContent)
      return Array.isArray(tasks) ? tasks : []
   } catch (error) {
      if (error.code === 'ENOENT') {
         await writeFile(tasksFile, '[]\n')
         return []
      }

      throw error
   }
}

async function saveTasks(tasks) {
   await mkdir(dataDirectory, { recursive: true })
   await writeFile(tasksFile, `${JSON.stringify(tasks, null, 2)}\n`)
}

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use((request, _response, next) => {
   console.log(`${request.method} ${request.url}`)
   next()
})

app.get('/', (_request, response) => {
   response.send('Homepage fonctionnel')
})

app.get('/api/tasks', async (_request, response) => {
   try {
      const tasks = await readTasks()
      response.json(tasks)
   } catch (error) {
      console.error(error.message)
      response.status(500).json({ error: 'Impossible de récupérer les tâches.' })
   }
})

app.get('/api/tasks/:id', async (request, response) => {
   try {
      const tasks = await readTasks()
      const task = tasks.find((item) => item.id === request.params.id)

      if (!task) {
         return response.status(404).json({ error: 'Tâche introuvable.' })
      }

      return response.json(task)
   } catch (error) {
      console.error(error.message)
      return response.status(500).json({ error: 'Impossible de récupérer la tâche.' })
   }
})

app.post('/api/tasks', async (request, response) => {
   const title = request.body?.title?.trim()

   if (!title) {
      return response.status(400).json({ error: 'Le titre est obligatoire.' })
   }

   try {
      const tasks = await readTasks()
      const task = {
         id: randomUUID(),
         title,
         done: false
      }

      tasks.push(task)
      await saveTasks(tasks)
      return response.status(201).json(task)
   } catch (error) {
      console.error(error.message)
      return response.status(500).json({ error: 'Impossible de créer la tâche.' })
   }
})

app.patch('/api/tasks/:id', async (request, response) => {
   const { title, done } = request.body ?? {}

   if (
      (title !== undefined && (typeof title !== 'string' || !title.trim())) ||
      (done !== undefined && typeof done !== 'boolean')
   ) {
      return response.status(400).json({ error: 'Données de tâche invalides.' })
   }

   if (title === undefined && done === undefined) {
      return response.status(400).json({ error: 'Aucune modification fournie.' })
   }

   try {
      const tasks = await readTasks()
      const task = tasks.find((item) => item.id === request.params.id)

      if (!task) {
         return response.status(404).json({ error: 'Tâche introuvable.' })
      }

      if (title !== undefined) task.title = title.trim()
      if (done !== undefined) task.done = done

      await saveTasks(tasks)
      return response.json(task)
   } catch (error) {
      console.error(error.message)
      return response.status(500).json({ error: 'Impossible de modifier la tâche.' })
   }
})

app.delete('/api/tasks/:id', async (request, response) => {
   try {
      const tasks = await readTasks()
      const remainingTasks = tasks.filter((item) => item.id !== request.params.id)

      if (remainingTasks.length === tasks.length) {
         return response.status(404).json({ error: 'Tâche introuvable.' })
      }

      await saveTasks(remainingTasks)
      return response.status(204).send()
   } catch (error) {
      console.error(error.message)
      return response.status(500).json({ error: 'Impossible de supprimer la tâche.' })
   }
})

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`)
})
