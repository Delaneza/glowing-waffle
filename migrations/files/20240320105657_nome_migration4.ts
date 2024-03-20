// import Corridor from '../src/api/corridor/model.js' // import example model

const ready = false

export async function up() {
  if (ready) {
    console.time('Time of script')

    // Your code here

    console.timeEnd('Time of script')
    console.log('Enter the migration code of migration_sprint_nome_migration4')
  } else {
    console.log(
      'The function create is not released for the application, change the ready key in arquive migrations/migration_sprint_nome_migration4 for true'
    )
    process.exit(1)
  }
}


