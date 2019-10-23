const redis = require('../core/redis-client')
const eventHandler = require('./event-handler')

const REDIS_KEY = 'AccountSummary'

const listAccounts = async () => {
  const summary = JSON.parse(await redis.getAsync(REDIS_KEY))
  return summary
}

const createAccount = async ({ name, balance }) => {
  await eventHandler.createAccount({ name, balance })
}

module.exports = {
  listAccounts,
  createAccount,
}
