const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
//! post
app.use(express.json())
app.use(morgan('combined'))



//!---------------------------------------------------------------------

const mongoose = require('mongoose')
const Schema = mongoose.Schema;


mongoose.connect("mongodb+srv://atakan:hlTje0R6sqrBznXD@cluster0.k1pwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PhoneSchema = new Schema({
    name : String,
    phone: String
})

const PhoneBook = mongoose.model("phonebook",PhoneSchema);
/*
const phoneBook = new PhoneBook({
    name:"Atakan Tek",
    phone:"0 532 202 8310"
})

phoneBook.save().then(result => {
    console.log('phone saved!')
    mongoose.connection.close()
  })
*/
PhoneBook.find({}).then((result) => {
    result.forEach(item => {
        console.log(item)
    })
    mongoose.connection.close();
})


//!---------------------------------------------------------------------


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
app.get('/api/persons',(request,response)=>{
    PhoneBook.find({})
    .then((result) => {
        response.json(result);
    })
    .catch((error) => {
        console.log("Error:",error)
    })
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

const PORT = process.env.PORT || 3001
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
  })

