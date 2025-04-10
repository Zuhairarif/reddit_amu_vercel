  import {Router} from "express"
  import userss from "../models/userss.js"
  const userssRoute = Router()

  userssRoute.get('/', async(req, res) => {
    res.send(await userss.find())
  })

  userssRoute.post('/', async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const profile = new userss({name, email, password})
    await profile.save()
    res.send(await userss.find())
  })

  userssRoute.put('/:id', async(req, res) => {
    await userss.findByIdAndUpdate(req.params.id, req.body)
    res.send(await userss.find())
  })

  userssRoute.delete('/:id', async (req, res) => {
      await userss.findByIdAndDelete(req.params.id)
      res.send(await userss.find())
  })
  
  export default userssRoute