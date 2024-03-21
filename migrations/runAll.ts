import * as fs from 'fs'
import mongoose from 'mongoose'
import * as path from 'path'
import Migration from './model'

export async function runAll(migration: string) {
  console.log('Running all migrations...')

  const migrationExecuted = await runMigration(migration)
  if (migrationExecuted === 'success') {
    console.log('All migrations executed successfully')
    mongoose.connection.close()
  }
}

async function runMigration(migration: string) {
  const directoryPath = path.resolve(__dirname, 'files')

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err)
    }
    console.log('files:', files)

    for await (const file of files) {
      const filePath = path.resolve(__dirname, 'files', migration)

      if (!fs.existsSync(`${filePath}.ts`)) {
        console.error('Migration not found')

        return
      }

      const executed = await executeMigration(filePath)

      if (executed === 'success') {
        await Migration.create({ migration: file, status: true, enviroment: 'development' })
      }
      console.log('Applied migrations:', migration)
    }
  })

  return 'success'
}

async function executeMigration(filePath: string) {
  const { up } = await import(filePath)
  const statusMigration = await up()
  return statusMigration
}
