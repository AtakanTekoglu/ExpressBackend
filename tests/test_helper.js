const PhoneBook = require('../models/phonebook');

const initialDatas = [
    {
        name:"Mert Kahraman",
        phone:"0 532 563 1278"
    },
    {
        name:"Ecem Aksaz",
        phone:"0 555 624 8314"
    }
]

const nonExistingId = async () => {
    const phone = new PhoneBook({ 'name': 'willremovethissoon', 'phone': '0 532 202 8310' })
    await phone.save()
    await phone.remove()
  
    return phone._id.toString()
  }

const phonesInDb = async () => {
    const phones = await PhoneBook.find({})
    return phones.map(phone => phone.toJSON())
  }

  module.exports = {
    initialDatas, nonExistingId, phonesInDb
  }