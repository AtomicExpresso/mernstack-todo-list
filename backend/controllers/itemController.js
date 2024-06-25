const ItemModel = require('../models/itemModel')
const mongoose = require('mongoose')

//Fetch all items from the database
const getAllItems = async (req, res) => {
  const allItems = await ItemModel.find({}).sort({createdAt: -1})

  res.status(200).json(allItems)
}

const getSingleItem = async (req, res) => {
  const {id} = req.params

    //Check if the item is a valid MONGODB object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: `The item with the id of ${id} couldent be found, isnt valid or dosent exist`})
    }

  const findItem = await ItemModel.findOne({_id: id})
  
  res.status(200).json(findItem)
}

// Adds item to the database with mongoose schema
const postItem = async (req, res) => {
  const {title, desc} = req.body //Destructure the request body

  try {
    const item = await ItemModel.create({title, desc})
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//Sends a delete request to the database
const deleteItem = async (req, res) => {
  const {id} = req.params

  //Check if the item is a valid MONGODB object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: `The item with the id of ${id} couldent be found, isnt valid or dosent exist`})
  }

  const item = await ItemModel.findOneAndDelete({_id: id})

  //Check if the item was found and deleted
  if (!item){
    return res.status(404).json({error: `The item could not be deleted`})
  }

  res.status(200).json(item)
}

const patchItem = async (req, res) => {
  const {id} = req.params

  //Check if the item is a valid MONGODB object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: `The item with the id of ${id} couldent be found, isnt valid or dosent exist`})
  }

  const updateItem = await ItemModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  //check if the item was found and updated
  if(!updateItem) {
    return res.status(400).json({error: `Item could not be deleted`})
  }

  res.status(200).json(updateItem)
}

module.exports = {
  getAllItems,
  getSingleItem,
  postItem,
  deleteItem,
  patchItem
}