import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { randomUUID } from 'node:crypto'
import mysql from 'mysql2/promise'

// Initialise l'application et récupère le port depuis les variables d'environnement.
const app = express()
const port = Number(process.env.PORT || 3301)

// Crée un pool de connexions réutilisables vers la base MySQL.
const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
})

// Autorise le frontend React à communiquer avec l'API et accepte les requêtes JSON.
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Vérifie que l'API répond et que la base de données est accessible.
app.get('/api/health', async (_request, response) => {
  try {
    await database.query('SELECT 1')
    response.json({ api: 'ok', database: 'ok' })
  } catch (error) {
    console.error(error.message)
    response.status(500).json({ api: 'ok', database: 'unavailable' })
  }
})

// Récupère toutes les tâches, de la plus récente à la plus ancienne.
app.get('/api/tasks', async (_request, response) => {
  try {
    const [tasks] = await database.query(
      'SELECT id, title, done, created_at, updated_at FROM tasks ORDER BY created_at DESC'
    )
    response.json(tasks)
  } catch (error) {
    console.error(error.message)
    response.status(500).json({ error: 'Impossible de récupérer les tâches.' })
  }
})

// Crée une tâche après validation de son titre.
app.post('/api/tasks', async (request, response) => {
  const title = request.body?.title?.trim()

  if (!title) {
    return response.status(400).json({ error: 'Le titre est obligatoire.' })
  }

  try {
    const id = randomUUID()
    await database.query(
      'INSERT INTO tasks (id, title, done) VALUES (?, ?, ?)',
      [id, title, false]
    )
    const [tasks] = await database.query(
      'SELECT id, title, done, created_at, updated_at FROM tasks WHERE id = ?',
      [id]
    )
    return response.status(201).json(tasks[0])
  } catch (error) {
    console.error(error.message)
    return response.status(500).json({ error: 'Impossible de créer la tâche.' })
  }
})

// Modifie le titre et/ou le statut d'une tâche existante.
app.patch('/api/tasks/:id', async (request, response) => {
  const { id } = request.params
  const title = request.body?.title?.trim()
  const done = request.body?.done

  if (title === '' || (done !== undefined && typeof done !== 'boolean')) {
    return response.status(400).json({ error: 'Données de tâche invalides.' })
  }

  try {
    // Prépare uniquement les champs envoyés par le frontend.
    const fields = []
    const values = []

    if (title) {
      fields.push('title = ?')
      values.push(title)
    }
    if (done !== undefined) {
      fields.push('done = ?')
      values.push(done)
    }

    if (!fields.length) {
      return response.status(400).json({ error: 'Aucune modification fournie.' })
    }

    values.push(id)
    const [result] = await database.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
      values
    )

    if (!result.affectedRows) {
      return response.status(404).json({ error: 'Tâche introuvable.' })
    }

    const [tasks] = await database.query(
      'SELECT id, title, done, created_at, updated_at FROM tasks WHERE id = ?',
      [id]
    )
    return response.json(tasks[0])
  } catch (error) {
    console.error(error.message)
    return response.status(500).json({ error: 'Impossible de modifier la tâche.' })
  }
})

// Supprime une tâche à partir de son identifiant.
app.delete('/api/tasks/:id', async (request, response) => {
  try {
    const [result] = await database.query(
      'DELETE FROM tasks WHERE id = ?',
      [request.params.id]
    )

    if (!result.affectedRows) {
      return response.status(404).json({ error: 'Tâche introuvable.' })
    }

    return response.status(204).send()
  } catch (error) {
    console.error(error.message)
    return response.status(500).json({ error: 'Impossible de supprimer la tâche.' })
  }
})

app.listen(port, () => {
  console.log(`API Taskplus disponible sur http://localhost:${port}`)
})
