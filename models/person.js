const mongoose = require('mongoose')
const Schema = mongoose.Schema;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
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



PhoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
/*
phone.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })*/

  module.exports = mongoose.model('Phone', phoneSchema)