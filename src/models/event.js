const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  name: String,
  payload: Object
})

module.exports = mongoose.model('Event', EventSchema)
