const Player = require("../models/User");                 //User is here called Player, cause in userRouter.js we already got a get method, but this one is only for verification purpos. 
                                                         //In this component we declare functions for .get, .get:id and .post Players Stats 
                                                         //In API dir we define the route with its methods


const getPlayer = async (req, res, next) => {        //to display all Player 
    try {
        const player = await Player.find()
        res.json({
            data: player,
            msg: "show all Users",
        })
    } catch (err) {
        console.log(err)
    }
}

const getOnePlayer = async (req, res, next) => {      //to display one specific Player
    try {
        const { id } = req.params
        const player = await Player.findById(id)
        res.json({
            data: player,
        })
    } catch (err) {
        console.log(err)
    }
}

const updatePlayer = async (req, res) => {            //to update STATS of one specific Player
    try {
        const { id } = req.params
        const { gamesPlayed, gamesWon } = req.body

        const player = await Player.findByIdAndUpdate(
            id,
            {
                gamesPlayed,
                gamesWon,
            },
            { new: true }
        )
        res.json({
            msg: `User with id ${player.id} updated`,
            success: true,
            data: player,
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {                          
    getPlayer,
    updatePlayer,
    getOnePlayer,
}