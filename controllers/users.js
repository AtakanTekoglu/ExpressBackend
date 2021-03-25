const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('phonebooks',{name:1,phone:1})
    //!Populate'ye parametre olarak verilen 'phonebooks' modelin içindeki alanın ismidir.
    response.json(users)
  })


usersRouter.post('/', async (request, response) => {
  const body = request.body
  
  

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
  response.status(200).end()
})


module.exports = usersRouter