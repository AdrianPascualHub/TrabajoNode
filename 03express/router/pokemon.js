const express = require('express') 
const router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayPokemonDB = await Pokemon.find();
        console.log(arrayPokemonDB);
        res.render("pokemon", { 
            arrayPokemon: arrayPokemonDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear'); //nueva vista que llamaremos Crear
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const pokemonDB = new Pokemon(body) //Creamos un nuevo Pokemon, gracias al modelo
        await pokemonDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/pokemon') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;