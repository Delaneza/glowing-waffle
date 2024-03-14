import { scheduleJob } from 'node-schedule'

export const scheduleAllJobs = () => {
  scheduleJob('*/1 * * * *', () => {
    console.log('EXAMPLE: This job runs every minute')
  })
}
