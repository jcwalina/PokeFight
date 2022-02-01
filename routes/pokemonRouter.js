const express = require('express');
const pokemonRouter = express.Router();
const jsonData = require('../pokedex.json');

  

pokemonRouter.get("/", (req, res) => {
    const pokemonAll = jsonData.map(eachPokemon => {
        return eachPokemon.name.english
    })
    res.send(pokemonAll)
})

pokemonRouter.get("/:id", (req,res)=> {
    const id = req.params.id
    const pokemon = jsonData.find(onePokemon => onePokemon.id === parseInt(id) ) // important...use parseInt
    res.send(pokemon)

})


pokemonRouter.get('/:id/:info', (req, res) => {
    const {id, info} = req.params
    const pokemonId = jsonData.find(c => c.id === parseInt(id));
    if(pokemonId && info === 'name') res.send(pokemonId.name.english) // http://localhost:3002/api/pokemon/1/name
    else if (pokemonId && info === 'base') res.send(pokemonId.base)
    else if (pokemonId && info === 'type') res.send(pokemonId.type)
    else res.status(404).send('Pokemon not found')  
    }); 
        

module.exports= pokemonRouter