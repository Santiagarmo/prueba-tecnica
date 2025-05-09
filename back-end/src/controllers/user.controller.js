import asyncHandler from 'express-async-handler';
import { User } from '../models/user.models.js';

 // Controlador para obtener todos los usuarios
export const getUser = asyncHandler(async (req, res ) => {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
})

// Controlador para obtener un usuario por ID 
export const getUserById = asyncHandler(async (req, res) => {

    // Verificar si el usuario se encuentra en la base de datos
    const user = await User.findById(req.params.id).select('-password');    
    if (!user) {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
    res.status(200).json(user);
})

// Controlador para crear un nuevo usuario

export const createUser = asyncHandler(async (req, res) =>{
    const { name, email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Por favor, complete todos los campos');
    }
    const userExists = await User.find ({ email });

    // Verificar si el usuario ya existe
    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'user'
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } else{
        res.status(400);
        throw new Error('Error al crear el usuario');
    }
})

// Controlador para actualizar un usuario

export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        name = req.body.name || user.name;
        email = req.body.email || user.email;
    }
    if (req.body.password){
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    if (updatedUser) {
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        })
    } else {
        res.status(400);
        throw new Error('Error al actualizar el usuario');
    }

}) 

export const deleteUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.status(200).json({ message: 'Usuario eliminado' });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
})