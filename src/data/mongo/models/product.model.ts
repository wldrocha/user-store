import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  }
})

productSchema.set('toJSON', {
  virtuals: true, // show id
  versionKey: false, // remove __v
  transform: function (doc, ret, options) { // not used arrow function to use this
    delete ret._id
  }
})

export const ProductModel = mongoose.model('Product', productSchema)
