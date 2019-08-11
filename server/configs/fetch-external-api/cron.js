var CronJob = require('cron').CronJob;

const firstFetch = require('./fetch-movies2')


//new CronJob('*/1 * * * *', function() {
new CronJob('0 */6 * * *', function() {
  console.log('You will see this message every second');
  firstFetch()
}, null, true, 'America/Los_Angeles');