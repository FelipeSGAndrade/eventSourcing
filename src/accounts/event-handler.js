const redis = require('../core/redis-client')
const store = require('../core/event-store')
const reducer = require('./reducers/accountSummaryReducer')
const accountEvents = require('./events')

const REDIS_KEY = 'AccountSummary'

const initialize = async () => {
  const events = await store.getEvents()

  const accountSummary = reducer.replay(events)

  redis.set(REDIS_KEY, JSON.stringify(accountSummary))

  store.subscribe(accountEvents.CREATE_ACCOUNT, accountEvent)
  store.subscribe(accountEvents.UPDATE_ACCOUNT, accountEvent)
  store.subscribe(accountEvents.ACCOUNT_TRANSFER, accountEvent)
}

const accountEvent = async (event) => {
  const accountSummary = JSON.parse(await redis.getAsync(REDIS_KEY))
  const newAccountSummary = reducer.processEvent(accountSummary, event)

  redis.set(REDIS_KEY, JSON.stringify(newAccountSummary))
}

const createAccount = ({ name, balance }) => {
  if(!name || !balance)
    throw new Error('Wrong payload')

  store.publish({
    name: accountEvents.CREATE_ACCOUNT,
    payload: { name, balance }
  })
}

module.exports = {
  initialize,
  createAccount
}
