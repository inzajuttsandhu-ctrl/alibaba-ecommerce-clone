const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  imageURL: {
    type: String,
    default: '/images/placeholder.jpg'
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  numOrders: {
    type: Number,
    default: 0
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

// Text index for search
productSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
