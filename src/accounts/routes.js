const express = require('express')
const router = express.Router()
const AccountsController = require('./controller')

router.get('/accounts', AccountsController.listAccounts)

router.post('/accounts', AccountsController.createAccount)

module.exports = router
