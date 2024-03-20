import dotenv from 'dotenv-safe'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI)
dotenv.config()
// mongoose.connect(process.env.MONGODB_URI)

const migrationSchema = new Schema(
  {
    migration: String,
    status: Boolean,
    enviroment: String,
  },
  { timestamps: true, versionKey: false }
)
const Migration = mongoose.model('Migration', migrationSchema)

export default Migration
