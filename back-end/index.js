const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

// Importar rutas
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const saleRoutes = require('./routes/saleRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const warehouseRoutes = require('./routes/warehouseRoutes');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas base
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/sales', saleRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/warehouses', warehouseRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de AGRO SENA funcionando correctamente');
});

// Manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'producción' ? null : err.stack,
  });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión a MongoDB establecida');
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });