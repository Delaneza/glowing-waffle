import * as fs from 'fs'
import * as path from 'path'
import { Command } from 'commander'





export function generate(migration: string, run: string) {
  console.log('Start generating the migration file:', migration)
  
  // npm run mmigrate  create nome_arquivo_migration 

  createFileMigration(migration)
}

function formatTimeForMigration(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hour}${minutes}${seconds}`
}

function createFileMigration(migration: string) {
  const formatedTime: string = formatTimeForMigration()

  const dir = path.resolve(__dirname, 'files')
  const pathFile = path.join(dir, `${formatedTime}_${migration}.ts`)

  if (fs.existsSync(pathFile)) {
    console.log('Migration already exists')
    return
  }

  const content = getContent(migration)

  try {
    fs.writeFileSync(pathFile, content)
    console.log('Migration created successfully')
  } catch (err) {
    console.error('Error creating migration', err)
  }
}

function getContent(fileMigration: string) {
  return `// import Corridor from '../src/api/corridor/model.js' // import example model

const ready = true

export async function up() {
  if (ready) {
    console.time('Time of script')

    // Your code here

    console.timeEnd('Time of script')
    console.log('Enter the migration code of migration_sprint_${fileMigration}')
  } else {
    console.log(
      'The function create is not released for the application, change the ready key in arquive migrations/migration_sprint_${fileMigration} for true'
    )
    process.exit(1)
  }
}


`
}


