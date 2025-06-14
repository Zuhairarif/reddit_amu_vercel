import {Router} from "express";
import { Comments } from "../models/comment.model";
import mustacheExpress from "mustache-express";
const muchtacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())
app.set('views', './posts')
app.set('view engine', 'mustache') 
const app = Router();

app.get("/", async(req, res) => {
    res.send()
})
