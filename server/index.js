import express from "express"
import { initDB } from './src/database/initDB.js'
import UserAPI from './src/api/User.api.js'

const app = express()
const port = 3000

initDB()

const userAPI = new UserAPI();
userAPI.setApp(app)
    .injectGetEndpoints()
    .injectPostEndpoints()
    .injectPatchEndpoints()
    .injectDeleteEndpoints();

app.get('/tasks/:id', (req, res) => {
    res.status(200).send(true)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})