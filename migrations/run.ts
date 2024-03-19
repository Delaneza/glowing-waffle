import { Command } from './command'

const program = new Command()

program.arguments('<migration> <environment> <development>').description('Generate a new migration').action(run)

function run(migration: string) {
  console.log('Running migrations...')
}



program.parse(process.argv)
