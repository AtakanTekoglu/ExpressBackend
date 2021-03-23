require('dotenv').config()
const Phone = require('./models/person')
const express = require('express')
const app = express()

var morgan = require('morgan')

//!npm install cors ile gelir
//!same origin policy
const cors = require('cors')
app.use(cors())



//!In order to access the data easily, we need the help of the express json-parser, that is taken to use with command app.use(express.json()). */
app.use(express.json())
app.use(morgan('combined'))

//!whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address. If a correct file is found, express will return it.
app.use(express.static('build'))

let persons = [
      {
        name: "Ahmet Kağan",
        phone: "0 532 202 4155",
        id: 1
      },
      {
        name: "Ekin Güven",
        phone: "0 532 145 2555",
        id: 2
      },
      {
        name: "Atakan Tekoğlu",
        phone: "0 537 295 8282",
        id: 3
      },
      {
        name: "Cihan Kaya",
        phone: "0 544 236 9865",
        id: 4
      }
]



//! post
const generateId = () => {
    const maxId = persons.length > 0
                  ? Math.max(...persons.map(i => i.id))
                  : 0
    return maxId + 1
}
app.post('/api/persons',(request,response) => {
    const body = request.body
    if(!body.phone || !body.name){
        return response.status(404).json({
            error:'phone or name field is missing'
        })
    }
    const nameControl = persons.filter(item => item.name.toUpperCase() !== body.name.toUpperCase())
    console.log(nameControl)
    if((nameControl.length ) === persons.length - 1){
        return response.status(404).json({
            error:'The name field that you tried to add already existed.'
        })
    }
    const person = {
        name:body.name,
        phone: body.phone,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(persons)
})

//!delete by given id
app.delete('/api/persons/:id',(request,response) => {
    const targetId = Number(request.params.id)
    persons = persons.filter(person => person.id !== targetId)
     response.status(204).end()
})

//!get the record by identified id
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(m => m.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

//!get all persons
app.get('/api/persons',(request,response)  =>{
    Phone.find({}).then(items => {
        response.json(items)
      }).catch(error =>
          console.log(error)
      )
})

//!get the length of records
app.get('/info',(request,response)=>{
    const lengthOfPersons = persons.length
    const showData = {
        info:`Phonebook has info for ${lengthOfPersons} people`,
        date: new Date()
    }
    response.json(showData)
})

//!Now we are using the port defined in environment variable PORT or port 3001 if the environment variable PORT is undefined. 
//*Heroku configures application port based on the environment variable.
const PORT = process.env.PORT || 3001
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
  })

