import { Command } from './command'
import fs from 'fs'

const program = new Command()

program.arguments('<migration> ').description('Generate a new migration').action(rollback)

function rollback(migration: string) {
  console.log('rollback migrations...')
}

program.parse(process.argv)
