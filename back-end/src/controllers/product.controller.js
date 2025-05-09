import asyncHandler from 'express-async-handler';
import { Product } from '../models/product.models.js';

// Controlador para obtener todos los productos
export const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
})

// Controlador para obtener un producto por ID
export const getProductsById = asyncHandler(async (req,res) => {
    const products = await Product.find(req.params.id);
    
    if (!products) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
    res.json(products);
})

// Controlador para crear un nuevo producto
export const createProduct = asyncHandler(async (req,res) => {
    const { name, description, category, unit, price, stock, expiryDate, warehouseId} = req.body;

    const product = await Product.create({
        name,
        description,
        category,
        unit,
        price,
        stock,
        expiryDate,
        warehouseId
    })

    if (product) {
        res.status(201).json(product);   
    }
    else {
        res.status(400);
        throw new Error('Error al crear el producto');
    }
})

export const updateProduct = asyncHandler(async (req,res) => {

    const { name, description, category, unit, price, stock, expiryDate, warehouseId} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.unit = unit || product.unit;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.expiryDate = expiryDate || product.expiryDate;
        product.warehouseId = warehouseId || product.warehouseId;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
})
