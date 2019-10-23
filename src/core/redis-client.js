const redis = require('redis')
const client = redis.createClient()

client.on('error', console.log)

client.getAsync = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

module.exports = client
