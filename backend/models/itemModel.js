const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('ItemModel', ItemSchema)