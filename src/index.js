require('dotenv').config;
const express = require('express');
const app = express();
const cors = require('cors');
// const routes = require('./src/routes/routes');
const routes = require('./routes/routes')
// const databaseMiddleware = require('./src/middleware/databasereport');
const databaseMiddleware = require('./middleware/databasereport');

// Definir el entorno de ejecución (development, production, etc.)
const environment = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(databaseMiddleware);

app.use(cors());

app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log(`Tipo de ambiente: ${environment}`);
    console.log(`Base de datos en el puerto: ${process.env.DB_PORT}`);
})

module.exports = app;