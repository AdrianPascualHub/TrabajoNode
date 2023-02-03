const express = require('express')
const bodyParser  = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require ('dotenv').config()
const port = process.env.PORT||3005
//Conexión a base de datos
const mongoose = require('mongoose');

//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.semeioe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

//motor de plantilla
app.set('views',__dirname + '/views');
app.set('view engine' ,'ejs')

//middleware
app.use(express.static(__dirname + '/public'));

//Llamadas a las rutas:
app.use('/', require('./router/rutas'));
app.use('/entrenador', require('./router/entrenador'));
app.use('/pokemon', require('./router/pokemon'));

app.use((req, res) => {
  res.status(404).render("404", {
      titulo: "404",
      descripcion: "Titulo del sitio web"
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})