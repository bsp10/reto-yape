const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const transactionController = require('./controllers/transactionController');

const app = express();

// Configuración del middleware para analizar el cuerpo de las solicitudes
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura las rutas de la API
app.use('/api/transactions', transactionController);

module.exports = app;
