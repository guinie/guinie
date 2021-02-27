const React = require('react')
const { Login } = require('./index')
const { configure } = require('@guinie/react-native')
const { cleanup, act } = require('@testing-library/react-native')

const actions = require('./Login.test-actions')

// Extract functions from guinieReact for convenience
const { wrapDriver, context } = configure()

// Bind login UI actions to context
const login = actions.login(context)

// A utility function for producing simple spy functions
const makeSpy = () => {
  const calledWith = []
  const f = (...args) => calledWith.push(args)
  const getCalls = () => calledWith
  return [f, getCalls]
}

describe('Login component', () => {
  // Clean virtual component tree after eact test
  afterEach(cleanup)

  it('should not call `loginAs` with an empty username', async () => {
    const [loginAs, getCalls] = makeSpy()

    // Get a wrapped react driverState
    const driverState = wrapDriver(<Login loginAs={loginAs} />)

    // Parameterize login action with details
    const loginWithEmptyUsername = login({ username: '' })

    // Run the parameterized action on react driverState
    await act(async () => {
      const updatedDriverState = await loginWithEmptyUsername(driverState)
    })

    // Verify component behavior
    const callCount = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const calls = getCalls()
        resolve(calls.length)
      }, 1000)
    })
    expect(callCount).toBe(0)
  })

  it('should call `loginAs` with a non-empty username', async () => {
    const [loginAs, getCalls] = makeSpy()

    // Get a wrapped react driverState
    const driverState = wrapDriver(<Login loginAs={loginAs} />)

    // Parameterize login action with details
    const loginWithEmptyUsername = login({ username: 'User' })

    // Run the parameterized action on react driverState
    await act(async () => {
      const updatedDriverState = await loginWithEmptyUsername(driverState)
    })

    // Verify component behavior
    const callCount = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const calls = getCalls()
        resolve(calls.length)
      }, 1000)
    })
    expect(callCount).toBe(1)
  })
})
