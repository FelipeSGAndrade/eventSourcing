const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const accountsRoutes = require('./src/accounts/routes')
const accountEventHandler = require('./src/accounts/event-handler')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/eventSourcing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

accountEventHandler.initialize();
app.use(accountsRoutes)

// app.get('/', (req, res) => {
//   const accounts = accountsService.listAccounts()
//   res.render('index', { accounts, history : [] })
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
