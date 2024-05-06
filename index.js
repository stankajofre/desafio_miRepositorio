import express from 'express'
const cancionesRouter = require('./routes/canciones');
const app = express()

app.use(express.static('public'))  // archivos estaticos 
app.use(express.json());  //mid para parsear json
app.use('/cancion', cancionesRouter);  //ruta para las canciones 





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})