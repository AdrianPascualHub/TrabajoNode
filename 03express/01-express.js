const express = require('express') //Requerimos Express
const bodyParser  = require('body-parser');
const app = express() //Variable para utilizar lo que estamos requiriendo
require('dotenv').config()
//Cuando lo subamos a un servidor real, deberemos cambiarlo
const port = process.env.PORT || 3005;
//USUARIO Y CONTRASEÑA CLUST
//cursonode
//7OnRZP2Mf3uYvYRW
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
//const user = 'cursonode';
//const password = '7OnRZP2Mf3uYvYRW';
//const dbname = 'dbpokemon';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.semeioe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

//Cuando lo subamos a un servidor real, deberemos cambiarlo, COMO YA VEREMOS
//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
//middleware
app.use(express.static(__dirname + '/public'));
//Vamos a recibir una petición realizada por el cliente mediante GET,
//que como ya hemos visto y sabemos viene determinada por la URL
app.get('/', (req, res) => {  //Usamos la función flecha (para evitar crear ninguna función)
// Siempre, siempre, siempre tendremos un requerimiento (req) y una respuesta (res)
// La barra, como sabemos, es para que busque en la raíz (localhost) 
res.render("index",{titulo:"mi titulo dinamico"});
})

app.get('/contacto', (req, res) => {
    res.render("contacto",{tituloContacto:"Estamos en contacto de manera dinámica"});
   })
//LLAMADAS A LAS RUTAS
app.use('/', require('./router/rutas'));
app.use('/pokemon', require('./router/pokemon'));

//ERROR 404
app.use((req,res) => {
    res.status(404).render("404",
    {titulo:"Error 404",
    descripcion:"Page Not Found"});
   })
   
   

app.listen(port, () => { //Nuevamente, usamos la función flecha
  console.log(`Example app listening at http://localhost:${port}`)
  //Es importante mostrar el puerto, ya que cuando esté en producción
  //ese puerto será dinámico y habrá cambiado. Así podremos saber cual es
})


