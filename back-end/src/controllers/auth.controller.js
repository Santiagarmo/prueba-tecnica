// Importamos los modulos necesarios

import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';

// Controlador para login de usuario
export const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        res.status(400);
        throw new Error('Por favor, complete todos los campos');
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ email });

    // Comparamos el usuario ingresado y la contraseña con la registrada en la base de datos
    if (user && (await user.comparePassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // Generamos el token de acceso
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401);
        throw new Error('Credenciales inválidas | Usuario o contraseña incorrectos');
    }
})

// Controlador para obtener el usuario

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    // Verificamos si el usuario existe y devolvemos la información en Json
    if (user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })

    }else{
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
})

// Controlador para actualizar el usuario
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    
        // Verificamos si la contraseña fue ingresada || Si no fue ingresada, mantenemos la contraseña actual
        // Si fue ingresada, la actualizamos

        if(req.body.password){
             user.password = req.body.password || user.password;
        }
       
        // El usuario actualizado se guarda en la base de datos 
        const updateUser = await user.save();

        // Se guardan los valores en un objeto Json
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role,
        });
    }
    else{
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
})