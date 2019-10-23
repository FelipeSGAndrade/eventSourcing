const Event = require('../models/event')

const subscriptions = {}

const getEvents = async () => {
  return await Event.find()
}

const publish = async ({ name, payload }) => {
  await Event.create({ name, payload })

  const allListeners = subscriptions[name]
  if (allListeners) {
    for (const listener of allListeners) {
      listener({ name, payload })
    }
  }
}

const subscribe = (name, callback) => {
  if (!subscriptions[name])
    subscriptions[name] = [ callback ]
  else
    subscriptions[name].push(callback)
}

module.exports = {
  getEvents,
  publish,
  subscribe
}
