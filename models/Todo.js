const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: false
  },
  price: {
    type: Number,
    default: false
  },
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Todo', schema)

