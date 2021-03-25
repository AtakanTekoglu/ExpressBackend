const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
      type:String,
      unique:true
    },
  name: String,
  passwordHash: String,
  phonebooks: [//*phonebooks değişken ismi populate'nin ilk parametresini temsil eder.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phonebook' //!Bağlantı kurduğu tablonun ismi - Bağlantı kurduğum modelin mongoose.model("Phonebook",PhoneSchema); ile belirtilen 1.parametresine bağlanır.
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})


const User = mongoose.model('User', userSchema) //!Tablom

module.exports = User