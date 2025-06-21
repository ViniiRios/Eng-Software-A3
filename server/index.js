import express from 'express'
import cors from "cors"
import Database from './src/Database.js'
import Users from './src/api/Users.js'
import Tasks from './src/api/Tasks.js'
import Pipes from './src/api/Pipes.js'

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const port = 3000
const databaseAPI = new Database();
const usersCrud = new Users(databaseAPI);
const tasksCrud = new Tasks(databaseAPI);
const pipesCrud = new Pipes(databaseAPI);

app.get('/pipes/', async (req, res) => {
  const result = await pipesCrud.findAll(req.query);
  res.status(200).send(result)
})

app.get('/tasks/', async (req, res) => {
  const result = await tasksCrud.findAll(req.query);
  res.status(200).send(result)
})

app.get("/users", async (req, res) => {
  const result = await usersCrud.findAll(req.query);
  res.status(200).json(result)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})