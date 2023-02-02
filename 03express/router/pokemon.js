const express = require('express') 
const router = express.Router();

router.get('/', (req, res) => {
    res.render("pokemon", { //pokemon será el próximo fichero que creemos, AÚN NO EXISTE
        arrayPokemon: [ //Esta información, posteriormente, VENDRÁ DE LA BASE DE DATOS
            {id: 'pk01', nombre: 'Caterpie', tipo: 'Bicho', descripcion:'Es lamentable'},
            {id: 'pk02', nombre: 'Weedle', tipo: 'Bicho', descripcion:'También es lamentable'},
            {id: 'pk03', nombre: 'Magikarp', tipo: 'Agua', descripcion:'Qué cosa más mala'}
        ]
    })
})

module.exports = router;