import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.models.js';

// Modulo de protección de rutas 
export const protect = asyncHandler(async (req,res, next) => {
    let token;

    if (req.header.authorization && req.header.authorization.startWith('Bearer')){
        try {
            // Obterner el token del header
            token = req.header.authorization.split(' ')[1];

            // Verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Obtenemos el usuario del token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Token no válido o no proporcionado');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Token no proporcionado');
    }
})

// Modulo para verificar si el usuario es administrador

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado, no es administrador');
    }
}