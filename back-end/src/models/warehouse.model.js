const mongoose = require('mongoose');

// Definición del esquema de la bodega 

const warehouseSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      required: [true, 'El nombre de la bodega es obligatorio'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'El código de la bodega es obligatorio'],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'La dirección de la bodega es obligatoria'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'La ciudad es obligatoria'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isMain: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Comprobamos si la bodega del producto es la principal

warehouseSchema.pre('save', async function (next) {
    if(this.isMain){
        const mainWarehouse = await this.model('Warehouse').findOne({ isMain: true });
        if (mainWarehouse && mainWarehouse._id.toString() !== this._id.toString()) {
            mainWarehouse.isMain = false;
            await mainWarehouse.save();
        }
    }
    next();

})

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
module.exports = Warehouse;