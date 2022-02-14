const express = require("express")

const {
    getPlayer,
    updatePlayer,
    getOnePlayer,
} = require("../controllers/player")

const api = express.Router()

api.get('/', getPlayer)
api.get('/:id', getOnePlayer)
api.put('/:id', updatePlayer)

module.exports = api 