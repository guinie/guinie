import { By, until } from 'selenium-webdriver'
import seleniumContext from '@guinie/selenium'
import loginActions from '../views/Login/Login.test-actions'
import todoActions from '../views/TodoMain/TodoMain.test-actions'

const {
  wrapDriver,
  getChromeDriver,
  closeDriver,
  findElement,
  getElement,
  sequence,
  applyContext,
} = seleniumContext

const [
  login,
] = applyContext(
  loginActions.login
)(seleniumContext)

const [
  addTodo,
  toggleTodo,
  removeTodo,
] = applyContext(
  todoActions.addTodo,
  todoActions.toggleTodo,
  todoActions.removeTodo,
)(seleniumContext)

describe('Todo app', () => {
  let driver

  beforeAll(function() {
    driver = getChromeDriver({ headless: false })
  });

  beforeEach(async function() {
    await driver.get('http://localhost:3000')
  });

  afterAll(async function() {
    await closeDriver(driver)
  });

  it('should log in, add-, toggle and remove todo', async () => {
    const driverState = wrapDriver(driver)

    const finalDriverState = await sequence(
      login({ username: 'Jekke' }),
      addTodo({ title: 'Fix it' }),
      toggleTodo({ title: 'Fix it' }),
      removeTodo({ title: 'Fix it' }),
    )(driverState)

    try {
      await getElement('todo-list--Fix it--title')(driverState)
      throw new Error('Todo found after remove action')
    } catch (err) {
      return
    }
  })
})
