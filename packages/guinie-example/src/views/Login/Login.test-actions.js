const { compose, sequence } = require('@guinie/react')

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
