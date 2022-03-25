import mongoose from 'mongoose'
import { textSpanContainsPosition } from 'typescript'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)

export { User }
