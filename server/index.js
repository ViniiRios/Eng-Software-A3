import express from "express"
import { initDB } from './src/database/initDB.js'
import Users from './src/api/User.js'

const app = express()
const port = 3000

initDB()

app.get('/tasks/:id', (req, res) => {
    res.status(200).send(true)
})

app.get("/users", (req, res) => {
    const result = Users.findAll();
    res.status(200).json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})