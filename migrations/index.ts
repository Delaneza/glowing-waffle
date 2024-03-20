import { Command } from 'commander'
const program = new Command()

import { generate } from './generate'
import { run } from './run'
import { runAll } from './runAll'

/**
 * -------------------------------------------------------------------
 * | node migration.js  |  "action"  |   "migrate"    |    isTest    |
 * -------------------------------------------------------------------
 * | node migration.js  |  create    |      60        |              |
 * | node migration.js  |  migrate   |      60        |     true     |
 * | node migration.js  |  rollback  |      60        |     true     |
 * -------------------------------------------------------------------
 */

//program.arguments('create <migration>' '<run>').description('Generate a new migration').action(generate)
program.command('create <migration> <teste>' ).description('Generate a new migration').action(generate)
program.command('run <migration>  <development>').description('Run migration').action(run)
program.command('run-all <migration>  <development>').description('Run migration').action(runAll)

program.parse(process.argv)