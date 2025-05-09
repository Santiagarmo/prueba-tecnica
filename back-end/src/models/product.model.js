const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: [true, 'El nombre del producto es obligatorio'],
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        category: {
          type: String,
          required: [true, 'La categoría es obligatoria'],
          trim: true,
        },
        unit: {
          type: String,
          required: [true, 'La unidad de medida es obligatoria'],
          trim: true,
        },
        price: {
          type: Number,
          required: [true, 'El precio es obligatorio'],
          min: [0, 'El precio no puede ser negativo'],
        },
        stock: {
          type: Number,
          required: [true, 'El stock es obligatorio'],
          min: [0, 'El stock no puede ser negativo'],
        },
        // Para control de calidad y trazabilidad
        expiryDate: {
          type: Date,
          default: null,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        warehouseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Warehouse',
          required: [true, 'El ID de la bodega es obligatorio'],
        }
      },
      {
        timestamps: true,
      }
    
)

// Definimos el modelo que tendrá el producto y lo exportamos

const Product = mongoose.model('Product', productSchema);

module.export = Product;
