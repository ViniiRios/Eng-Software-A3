import express from 'express'
import Database from './src/Database.js'
import Users from './src/api/User.js'

const app = express()
const port = 3000
const databaseAPI = new Database();
const userCrud = new Users(databaseAPI);

app.get('/tasks/:id', (req, res) => {
    res.status(200).send(true)
})

app.get("/users", async (req, res) => {
    const result = await userCrud.findAll(req.query);
    res.status(200).json(result)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})