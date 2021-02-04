import React from 'react'
import { act } from 'react-dom/test-utils'
import reactContext from '@guinie/react'
import { cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import actions from './TodoMain.test-actions'
import { TodoMain } from './index'

const { wrapDriver, findElement, getElement } = reactContext

const makeSpy = () => {
  const calledWith = []
  const f = (...args) => calledWith.push(args)
  const getCalls = () => calledWith
  return [f, getCalls]
}

const addTodo = actions.addTodo(reactContext)
const toggleTodo = actions.toggleTodo(reactContext)
const removeTodo = actions.removeTodo(reactContext)

describe('TodoMain component', () => {
  afterEach(cleanup)

  it('should add a todo', async () => {
    const driverState = wrapDriver(<TodoMain />)
    const addShoppingTodo = addTodo({ title: 'Shopping' })

    await act(async () => {
      const updatedDriverState = await addShoppingTodo(driverState)
    })

    const newTodo = await findElement(`todo-list--Shopping--title`)(driverState)
    return expect(newTodo).toBeDefined()
  })

  it('should toggle a todo', async () => {
    const driverState = wrapDriver(<TodoMain />)
    const addShoppingTodo = addTodo({ title: 'Shopping' })
    const toggleShoppingTodo = toggleTodo({ title: 'Shopping' })

    await act(async () => {
      await addShoppingTodo(driverState)
      await toggleShoppingTodo(driverState)
    })

    const newTodo = await findElement(`todo-list--Shopping--toggle`)(driverState)
    return expect(newTodo).toBeChecked()
  })

  it('should remove a todo', async () => {
    const driverState = wrapDriver(<TodoMain />)
    const addShoppingTodo = addTodo({ title: 'Shopping' })
    const removeShoppingTodo = removeTodo({ title: 'Shopping' })

    await act(async () => {
      await addShoppingTodo(driverState)
      await removeShoppingTodo(driverState)
    })

    try {
      const newTodo = await getElement(`todo-list--Shopping--title`)(driverState)
      throw new Error('Todo found after remove action')
    } catch (err) {
      return
    }

  })
})
