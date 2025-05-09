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
        price: {
          type: Number,
          required: [true, 'El precio es obligatorio'],
          min: [0, 'El precio no puede ser negativo'],
        },
        unit: {
          type: String,
          required: [true, 'La unidad de medida es obligatoria'],
          trim: true,
        },
        image: {
          type: String,
          default: 'default-product.jpg',
        },
        // Para control de calidad y trazabilidad
        harvestDate: {
          type: Date,
          default: null,
        },
        expiryDate: {
          type: Date,
          default: null,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
      {
        timestamps: true,
      }
    
)

// Crear modulo de busquedas eficientes

productSchema.index({name : 1});

productSchema.index({ category: 1 });

// Definimos el modelo que tendrá el producto y lo exportamos

const Product = mongoose.model('Product', productSchema);

module.export = Product;
