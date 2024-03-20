import { config } from 'dotenv-safe'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

config()

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('MONGODB_URI não está definida')
}

mongoose.connect('mongodb://172.20.0.2:27017/db').then(() => {
  console.log('conectado no banco!')
})

mongoose.connection.on('connected', () => {
  console.log('Conexão estabelecida com o MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Conexão com o MongoDB desconectada')
})

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
