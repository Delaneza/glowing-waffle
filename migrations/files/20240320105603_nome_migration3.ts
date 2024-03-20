// import Corridor from '../src/api/corridor/model.js' // import example model

const ready = true

export async function up() {
try {
    if (ready) {
      console.time('Time of script')

      // Your code here
      // throw new Error(
      //   'The function create is not released for the application, change the ready key in arquive migrations/migration_sprint_nome_migration3 for true'
      // )
      console.timeEnd('Time of script')
      console.log('Enter the migration code of migration_sprint_nome_migration3')
      return 'success'
    } else {
      console.log(
        'The function create is not released for the application, change the ready key in arquive migrations/migration_sprint_nome_migration3 for true'
      )
      return 'failed'
    }
} catch (error) {
  console.error('Error in migration_sprint_nome_migration3', error)
  return false
  
}
}


