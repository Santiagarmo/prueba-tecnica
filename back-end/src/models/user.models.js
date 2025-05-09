const mongoose = require ("mongoose")
const bycript  = require("bcryptjs")


// Definción del esquema de un usuario
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
          },
          email: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
          },
          password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
          },
          role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
          },
          warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            default: null, // Null significa que es usuario de la sede principal
          },
          isActive: {
            type: Boolean,
            default: true,
          },
          lastLogin: {
            type: Date,
            default: null,
          },
        },
        {
          timestamps: true,
        }

)


// Encriptamos la contraseña antes de guardar el usuario

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    try {
        const salt = await bycript.genSalt(10)
        this.password = await bycript.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Metodo para comparar la contraseña ingresada con la almacenada en la base de datos

userSchema.methods.comparePassword = async function (password){
    return await bycript.compare(password, this.password)
}

// Definimos el modelo que trandrá el usuario y lo exportamos 
const User = mongoose.model("User", userSchema)

module.exports = User