import mongoose, { Schema } from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
})

categorySchema.set('toJSON', {
  virtuals: true, // show id
  versionKey: false, // remove __v
  transform: function (doc, ret, options) { // not used arrow function to use this
    delete ret._id
  }
})

export const CategoryModel = mongoose.model('Category', categorySchema)
