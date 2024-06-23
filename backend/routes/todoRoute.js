const express = require('express')
const router = express.Router()
const {getAllItems, getSingleItem, postItem, deleteItem, patchItem} = require('../controllers/itemController')

//Handles the requests

//GET all
router.get('/', getAllItems)

//GET single
router.get('/:id', getSingleItem)

//POST item
router.post('/', postItem)

//DELETE item
router.delete('/:id', deleteItem)

//PATCH item
router.patch('/:id', patchItem)

module.exports = router