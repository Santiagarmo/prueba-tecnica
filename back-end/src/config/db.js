const mongoose = require('mongoose');

// Creamos la conexión a la base de datos

const connectDB = async () => {

    try{
        await mongoose.connect (process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Conexión a la base de datos establecida")
    }
    catch (error){
        console.error("Error al conectar a la base de datos", error)
        process.exit(1) // Salimos del proceso con un error
    }
}

module.exports = connectDB