import { configure, sequence, applyContext, utils, CAPABILITIES } from '@guinie/appium'
import loginActions from '../views/Login/Login.test-actions'
import todoActions from '../views/TodoMain/TodoMain.test-actions'

const { ios92, android19 } = CAPABILITIES

// Produce a selenium context with default config
const {
  wrapDriver,
  getDriver,
  closeDriver,
  context,
} = configure()

const getIosDriver = () => getDriver({
  device: ios92,
  app: './guinie-appium-example.ipa',
})

const getAndroidDriver = () => getDriver({
  device: android19,
  app: utils.getAndroidApkPath(),
})


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

// Scroll action
const scroll = params => {
  const { scrollDown } = context
  return sequence(
    scrollDown(params.container)
  )
}

describe('Todo app', () => {
  let driver
  let firstTest = true

  beforeAll(async function() {
    // Produce an android driver
    driver = await getAndroidDriver()
    return driver
  });

  beforeEach(async function() {
    if (firstTest) {
      firstTest = false
      return;
    }
    return driver.resetApp()
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

  it('should add a lot of stuff and scroll down', async () => {
    // Get a wrapped selenium driverState
    const driverState = wrapDriver(driver)

    // Produce a complex sequence of actions and run it on selenium driverState
    const finalDriverState = await sequence(
      login({ username: 'Jekke' }),
      addTodo({ title: 'Fix it later' }),
      addTodo({ title: 'Fix it 30' }),
      addTodo({ title: 'Fix it 29' }),
      addTodo({ title: 'Fix it 28' }),
      addTodo({ title: 'Fix it 27' }),
      addTodo({ title: 'Fix it 26' }),
      addTodo({ title: 'Fix it 25' }),
      addTodo({ title: 'Fix it 24' }),
      addTodo({ title: 'Fix it 23' }),
      addTodo({ title: 'Fix it 22' }),
      addTodo({ title: 'Fix it 21' }),
      addTodo({ title: 'Fix it 20' }),
      addTodo({ title: 'Fix it 19' }),
      addTodo({ title: 'Fix it 18' }),
      addTodo({ title: 'Fix it 17' }),
      addTodo({ title: 'Fix it 16' }),
      addTodo({ title: 'Fix it 15' }),
      addTodo({ title: 'Fix it 14' }),
      addTodo({ title: 'Fix it 13' }),
      addTodo({ title: 'Fix it 12' }),
      addTodo({ title: 'Fix it 11' }),
      addTodo({ title: 'Fix it 10' }),
      addTodo({ title: 'Fix it  9' }),
      addTodo({ title: 'Fix it  8' }),
      addTodo({ title: 'Fix it  7' }),
      addTodo({ title: 'Fix it  6' }),
      addTodo({ title: 'Fix it  5' }),
      addTodo({ title: 'Fix it  4' }),
      addTodo({ title: 'Fix it  3' }),
      addTodo({ title: 'Fix it  2' }),
      addTodo({ title: 'Fix it  1' }),
    )(driverState)

    await scroll({ container: 'todo-list--container' })(driverState)

    // Verify that the desired UI state is reached
    const row = findElement('todo-list--Fix it  1--title', { timeout: 500 })(driverState)
    const isDisplayed = await row.isDisplayed().then(val => val ? val : false).catch(() => false)
    expect(isDisplayed).toBe(false)

    return new Promise(resolve => setTimeout(() => resolve(), 5000))
  }, 600000)
})
