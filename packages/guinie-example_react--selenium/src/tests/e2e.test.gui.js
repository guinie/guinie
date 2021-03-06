import { By, until } from 'selenium-webdriver'
import { configure, sequence, applyContext } from '@guinie/selenium'
import loginActions from '../views/Login/Login.test-actions'
import todoActions from '../views/TodoMain/TodoMain.test-actions'

// Produce a selenium context with default config
const {
  wrapDriver,
  getChromeDriver,
  closeDriver,
  context,
} = configure()

// Get the context bound `findElement` function from context
const { findElement } = context

// Bind login UI actions to context
const [
  login,
] = applyContext(
  loginActions.login
)(context)

// Bind todo UI actions to context
const [
  addTodo,
  toggleTodo,
  removeTodo,
] = applyContext(
  todoActions.addTodo,
  todoActions.toggleTodo,
  todoActions.removeTodo,
)(context)

describe('Todo app', () => {
  let driver

  beforeAll(function() {
    // Produce a chrome driver
    driver = getChromeDriver({ headless: false })
  });

  beforeEach(async function() {
    // Navigate to page
    await driver.get('http://localhost:3000')
  });

  afterAll(async function() {
    // Close driver when all tests finish
    await closeDriver(driver)
  });

  it('should log in, add-, toggle and remove todo', async () => {
    // Get a wrapped selenium driverState
    const driverState = wrapDriver(driver)

    // Produce a complex sequence of actions and run it on selenium driverState
    const finalDriverState = await sequence(
      login({ username: 'Jekke' }),
      addTodo({ title: 'Fix it' }),
      toggleTodo({ title: 'Fix it' }),
      removeTodo({ title: 'Fix it' }),
    )(driverState)

    // Verify that the desired UI state is reached
    try {
      await findElement('todo-list--Fix it--title', { timeout: 500 })(driverState)
      throw new Error('Todo found after remove action')
    } catch (err) {
      return
    }
  })
})
