import * as fs from 'fs'
import mongoose from 'mongoose'
import * as path from 'path'
import Migration from './model'

export function run(migration: string) {
  console.log('Running  migration...')

  runMigration(migration)
}

async function runMigration(migration: string) {
  const filePath = path.resolve(__dirname, 'files', migration)
  console.log('filePath:', filePath)

  if (!fs.existsSync(`${filePath}.ts`)) {
    console.error('Migration not found')

    return
  }

  const executed = await executeMigration(filePath)

  if (executed === 'success') {
    console.log('Applied migrations:', migration)
    await Migration.create({ migration, status: true, enviroment: 'development' })

  }
  
  console.log('Migration executada:', migration)
  mongoose.connection.close()
}

async function executeMigration(filePath: string) {
  const { up } = await import(filePath)
  const statusMigration = await up()
  return statusMigration
}
