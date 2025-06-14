import express from "express"
const app = express()
import mustacheExpress from "mustache-express"
const PORT = 4000;
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.)