const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/routes');
const databaseMiddleware = require('./src/middleware/databasereport');

// Definir el entorno de ejecución (development, production, etc.)
const environment = process.env.NODE_ENV || 'development';

// Configurar dotenv para cargar las variables de entorno adecuadas
if (environment === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(databaseMiddleware);

app.use(cors());

app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log(`Tipo de ambiente: ${environment}`);
})

module.exports = app;