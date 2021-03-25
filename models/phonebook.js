const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
    name : {
        type:String,
        minlength:5,
        required:true
    },
    phone: {
        type:String,
        minlength:11,
        required:true
    },
    user:{ //*user değişken ismi populate'nin ilk parametresini temsil eder.
      type:mongoose.Schema.Types.ObjectId,
      ref:'User' //!Bağlantı kurduğu tablonun ismi - Bağlantı kurduğum modelin mongoose.model('User', userSchema) ile belirtilen 1.parametresine bağlanır.

    }
})

PhoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const PhoneBook = mongoose.model("Phonebook",PhoneSchema);

module.exports = PhoneBook;
