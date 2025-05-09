const mongoose = require('mongoose');

// Definición del esquema de inventario

const inventorySchema = new mongoose.Schema(
        {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [0, 'La cantidad no puede ser negativa'],
    },
    minQuantity: {
      type: Number,
      default: 5,
      min: [0, 'La cantidad mínima no puede ser negativa'],
    },
    // Para lotes específicos
    batchNumber: {
      type: String,
      default: null,
    },
    location: {
      // Ubicación específica dentro de la bodega
      type: String,
      default: 'General',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

// Indice de compras eficientes por producto y por almacen

inventorySchema.index({ product: 1, warehouse: 1 }, { unique: true })

// Método para actualizar la cantidad de inventario

inventorySchema.methods.updateStock = async function (productId, warehouseId, quantity) {
    
    const inventory = await this.model('Inventory').findOne({
        product: productId,
        warehouse: warehouseId,
    })

    if (!inventory){
        throw new error ('Inventario no encontrado')
    }

    inventory.quantity += quantity

    if (inventory.quantity <= 0) {
        throw new Error('El stock está agotado')
    }

    return await inventory.save()

};

const Inventory = mongoose.model('Inventory', inventorySchema) 

module.exports = Inventory 