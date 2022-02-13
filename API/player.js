const express = require("express")

const {
    getPlayer,
    updatePlayer,
    getOnePlayer,
} = require("../controllers/player")

const api = express.Router()

api.route("/").get(getPlayer)
api.route("/:id").put(updatePlayer).get(getOnePlayer)

module.exports = api 