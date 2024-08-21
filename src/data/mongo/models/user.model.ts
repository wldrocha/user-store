import e from 'express'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  emailValidated:{
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  role: {
    type: [String],
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE'
  }
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret.password
    delete ret._id
  }
})

export const UserModel = mongoose.model('User', userSchema)
