const mongoose = require('mongoose');
const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(cors());
//! post
app.use(express.json());
app.use(morgan('combined'));
require('dotenv').config();
const PhoneBook = require('./models/phonebook');



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

app.post('/api/persons',(request,response,next) => {
    const body = request.body

    if(!body.phone || !body.name){
        return response.status(404).json({
            error:'phone or name field is missing'
        })
    }
    /*
    const nameControl = persons.filter(item => item.name.toUpperCase() !== body.name.toUpperCase())
    console.log(nameControl)
    if((nameControl.length ) === persons.length - 1){
        return response.status(404).json({
            error:'The name field that you tried to add already existed.'
        })
    }
*/
    const person = new PhoneBook({
        name:body.name,
        phone: body.phone
    })
    person
    .save()
    .then((savedPersonPhone) => {
        return savedPersonPhone.toJSON()
    })
    .then((savedAndFormattedPersonPhone) => {
        response.json(savedAndFormattedPersonPhone)
    })
    .catch(error =>next(error))
    //!Next error handling için kullanıldı.
    
      
      
   
})

//!delete by given id
app.delete('/api/persons/:id',(request,response) => {
    PhoneBook.findOneAndRemove({_id:request.params.id})
    .then(item =>{
        response.json(item)
    })
    .catch((error) => {
        console.log("Error:",error)
    })
})
  
//!get the record by identified id
app.get('/api/persons/:id',(request,response)=>{
    PhoneBook.findOne({_id:request.params.id})
    .then(item =>{
        if(item){
            response.json(item)
        }
        else{
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
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

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
  
    next(error)
  }
app.use(errorHandler)


const PORT = process.env.PORT;
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
  })

