import React from 'react'
import { act } from 'react-dom/test-utils'
import reactContext from '@guinie/react'
import { cleanup } from '@testing-library/react'

import actions from './Login.test-actions'
import { Login } from './index'

const { wrapDriver } = reactContext

const makeSpy = () => {
  const calledWith = []
  const f = (...args) => calledWith.push(args)
  const getCalls = () => calledWith
  return [f, getCalls]
}

const login = actions.login(reactContext)

describe('Login component', () => {
  afterEach(cleanup)

  it('should not call `loginAs` with an empty username', async () => {
    const [loginAs, getCalls] = makeSpy()
    const driverState = wrapDriver(<Login loginAs={loginAs} />)
    const loginWithEmptyUsername = login({ username: '' })

    await act(async () => {
      const updatedDriverState = await loginWithEmptyUsername(driverState)
    })

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
    const driverState = wrapDriver(<Login loginAs={loginAs} />)
    const loginWithEmptyUsername = login({ username: 'User' })

    await act(async () => {
      const updatedDriverState = await loginWithEmptyUsername(driverState)
    })

    const callCount = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const calls = getCalls()
        resolve(calls.length)
      }, 1000)
    })

    expect(callCount).toBe(1)
  })
})
