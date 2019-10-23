const accountEvents = require('../events')

const createAccount = (summary, { name, balance }) => {
  if (!name || !balance)
    throw new Error('Wrong payload')

  return [ ...summary, { name, balance } ]
}

const processEvent = (accountSummary, event) => {
  const reducer = mapping[event.name];
  if (!reducer)
    return accountSummary

  return reducer(accountSummary, event.payload)
}

const replay = (events) => {
  return events.reduce(processEvent, [])
}

const mapping = {
  [accountEvents.CREATE_ACCOUNT] : createAccount,
}

module.exports = {
  processEvent,
  replay
}
