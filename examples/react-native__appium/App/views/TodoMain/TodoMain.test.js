const React = require('react')
const { configure, sequence } = require('@guinie/react-native')
const { cleanup, waitFor, act } = require('@testing-library/react-native')

const actions = require('./TodoMain.test-actions')
const { TodoMain } = require('./index')

// Extract functions from guinieReact for convenience
const { wrapDriver, context } = configure()

// Get the context bound `findElement` function from context
const { findElement } = context

// Bind login UI actions to context
const addTodo = actions.addTodo(context)
const toggleTodo = actions.toggleTodo(context)
const removeTodo = actions.removeTodo(context)

// A utility function for producing simple spy functions
const makeSpy = () => {
  const calledWith = []
  const f = (...args) => calledWith.push(args)
  const getCalls = () => calledWith
  return [f, getCalls]
}

describe('TodoMain component', () => {
  // Clean virtual component tree after eact test
  afterEach(cleanup)

  it('should add a todo', async () => {
    // Get a wrapped react driverState
    const driverState = wrapDriver(<TodoMain />)

    // Parameterize addTodo action with details
    const addShoppingTodo = addTodo({ title: 'Shopping' })

    // Run the parameterized action on react driverState
    await act(async () => {
      const updatedDriverState = await addShoppingTodo(driverState)
    })

    // Verify component behavior
    const newTodo = await findElement(`todo-list--Shopping--title`)(driverState)
    return expect(newTodo).toBeDefined()
  })

  it('should toggle a todo', async () => {
    // Get a wrapped react driverState
    const driverState = wrapDriver(<TodoMain />)

    // Parameterize addTodo and toggleTodo action with details
    const addShoppingTodo = addTodo({ title: 'Shopping' })
    const toggleShoppingTodo = toggleTodo({ title: 'Shopping' })

    // Run the parameterized action on react driverState
    await act(async () => {
      await addShoppingTodo(driverState)
      await toggleShoppingTodo(driverState)
    })

    // Verify component behavior
    const checkedTodo = await findElement(`todo-list--Shopping--toggle`)(driverState)
    return expect(checkedTodo).toHaveProp('value', true)

    // Run the parameterized action on react driverState
    await act(async () => {
      await toggleShoppingTodo(driverState)
    })

    const uncheckedTodo = await findElement(`todo-list--Shopping--toggle`)(driverState)
    return expect(uncheckedTodo).toHaveProp('value', false)
  })

  it('should remove a todo', async () => {
    // Get a wrapped react driverState
    const driverState = wrapDriver(<TodoMain />)

    // Parameterize addTodo and removeTodo action with details
    const addShoppingTodo = addTodo({ title: 'Shopping' })
    const removeShoppingTodo = removeTodo({ title: 'Shopping' })

    // Run the parameterized action on react driverState
    await act(async () => {
      await addShoppingTodo(driverState)
      await removeShoppingTodo(driverState)
    })

    // Verify component behavior
    try {
      const newTodo = await findElement(`todo-list--Shopping--title`, { timeout: 500 })(driverState)
      throw new Error('Todo found after remove action')
    } catch (err) {
      return
    }

  })
})
