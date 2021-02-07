const { sequence } = require('@guinie/react')

// Login
// 1. enter username to text field
// 2. click submit
const login = context => params => {
  const { click, type } = context
  return sequence(
    type('login-form--username', params.username),
    click('login-form--submit')
  )
}

module.exports = {
  login,
}
