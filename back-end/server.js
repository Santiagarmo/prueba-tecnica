// Importación dependencias

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();


const app = express();

// Uso de middleware

app.use(cors());
app.express.json();
app.morgan('dev');

// Conexión a MongoDB

mongoose.connect(process.env.MONGO_URI)

// Importación de rutas

