import asyncHandler from 'express-async-handler';
import { Product } from '../models/product.model.js';
import { Sale } from '../models/sale.model.js';
import { Warehouse } from '../models/warehouse.model.js';

export const getSales = asyncHandler(async (req, res) => {
    const sales = await Sale.find({}).populate('warehouseId', 'name').populate('userId', 'name');
    res.json(sales);
})
