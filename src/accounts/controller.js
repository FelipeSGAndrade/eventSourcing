const AccountsService = require('./service')

const listAccounts = async (req, res) => {
  const accounts = await AccountsService.listAccounts()
  res.send(accounts)
}

const createAccount = async (req, res) => {
  console.log(req.body)
  await AccountsService.createAccount(req.body)
  res.sendStatus(201)
}

module.exports = {
  listAccounts,
  createAccount,
}
