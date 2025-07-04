import express from 'express'
import cors from "cors"
import Database from './src/Database.js'
import Users from './src/api/Users.js'
import Tasks from './src/api/Tasks.js'
import Pipes from './src/api/Pipes.js'
import Status from './src/api/Status.js'

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const port = 3000
const databaseAPI = new Database();
const usersCrud = new Users(databaseAPI);
const tasksCrud = new Tasks(databaseAPI);
const pipesCrud = new Pipes(databaseAPI);
const statusCrud = new Status(databaseAPI);

app.get('/pipes/', async (req, res) => {
  const result = await pipesCrud.findAll(req.query);
  res.status(200).send(result)
})

app.get('/pipes/:id', async (req, res) => {
  const result = await pipesCrud.findById(req.params.id);
  res.status(200).send(result)
})

app.post('/pipes', async (req, res) => {
  const data = {};
  data.name = req.body.name;

  const response = await pipesCrud.create(data);
  res.status(200).send(response)
})

app.patch('/pipes/:id', async (req, res) => {
  const task = await pipesCrud.findById(req.params.id);
  const data = Object.assign(task, {});
  
  if(req.body?.name) data.name = req.body.name;

  await pipesCrud.updatePipe(req.params.id, data);
  res.status(200).send(data)
})

app.delete('/pipes/:id', async (req, res) => {
  const result = await pipesCrud.deleteById(req.params.id);
  res.status(200).send(result)
})

app.get('/tasks/', async (req, res) => {
  const result = await tasksCrud.findAll(req.query);
  res.status(200).send(result)
})

app.get('/status/', async (req, res) => {
  const result = await statusCrud.findAll(req.query);
  res.status(200).send(result)
})

app.get('/tasks/:id', async (req, res) => {
  console.log(req.params)
  const result = await tasksCrud.findById(req.params.id, req.query);
  res.status(200).send(result)
})

app.post('/tasks', async (req, res) => {
  const data = {};

  data.title = req.body.title;
  data.description = req.body.description;
  data.fk_pipe = req.body.pipeId;
  data.fk_status = req.body.statusId;
  console.log({data, body: req.body})

  const response = await tasksCrud.create(data);
  res.status(200).send(response)
})
app.patch('/tasks/:id', async (req, res) => {
  const task = await tasksCrud.findById(req.params.id);
  const data = Object.assign(task, {});

  console.log({body: req.body})
  
  if(req.body?.title) data.title = req.body.title;
  if(req.body?.description) data.description = req.body.description;
  if(req.body?.pipeId) data.fk_pipe = req.body.pipeId;
  if(req.body?.statusId) data.fk_status = req.body.statusId;

  await tasksCrud.updateTask(req.params.id, data);
  res.status(200).send(data)
})

app.delete('/tasks/:id', async (req, res) => {
  const result = await tasksCrud.deleteById(req.params.id);
  res.status(200).send(result)
})

app.get("/users", async (req, res) => {
  const result = await usersCrud.findAll(req.query);
  res.status(200).json(result)
})

app.post("/login", async (req, res) => {
  const result = await usersCrud.findByEmailAndPassword(req.body);
  res.status(200).json(result)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})