const mongoose = require('mongoose');

// Definición del esquema de venta para elementos individuales

const saleItemSchema = new mongoose.Schema(
    {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser mayor a 0'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo'],
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

// Definición del esquema principla de la venta

const saleSchema = new mongoose.Schema(
    {
    saleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      identification: {
        type: String,
        default: '',
      },
      phone: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        default: '',
      },
    },
    items: [saleItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'El total no puede ser negativo'],
    },
    paymentMethod: {
      type: String,
      enum: ['efectivo', 'transferencia', 'crédito', 'otro'],
      default: 'efectivo',
    },
    status: {
      type: String,
      enum: ['pendiente', 'completada', 'cancelada'],
      default: 'completada',
    },
    notes: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    documentType: {
      type: String,
      enum: ['factura', 'documento_equivalente'],
      default: 'documento_equivalente',
    },
    documentNumber: {
      type: String,
      required: true,
    },
    // Para sincronización offline
    syncStatus: {
      type: String,
      enum: ['synced', 'pending', 'error'],
      default: 'synced',
    },
    offlineId: {
      type: String,
      default: null,
    },
  },
  { 
    timestamps: true 
}
)

// Metodo para la generación de factura 

saleSchema.methods.generateInvoice = function (){
    // Lógica para generar la factura
    // Esto puede incluir la creación de un PDF, el envío por correo, etc.
    // Por simplicidad, solo retornaremos un objeto con los datos de la factura
    return {
        saleNumber: this.saleNumber,
        customer: this.customer,
        items: this.items,
        totalAmount: this.totalAmount,
        paymentMethod: this.paymentMethod,
        status: this.status,
        createdAt: this.createdAt,
    }
}

