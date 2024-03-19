import mongoose from 'mongoose'
const Schema = mongoose.Schema

const migrationSchema = new Schema({
    migration: String,
    status: Boolean,
    enviroment: String,    
    
  },
  { timestamps: true,
    versionKey: false
  }
  )
  const Migration = mongoose.model('Migration', migrationSchema)

  export default Migration