import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { Login, TodoMain } from './views'
import './App.css'

const loginAs = ({ setUser, setView }) => username => {
  setUser(username)
  setView('main')
}

const renderView = ({ view, user, setView, setUser }) => {
  switch (view) {
    case 'main':
      return <TodoMain user={user} setView={setView} />
    default:
      return <Login loginAs={loginAs({ setView, setUser })} />
  }
}

const App = () => {
  const [view, setView] = useState('login')
  const [user, setUser] = useState('')
  return (
    <Box my="10%" mx="20%">
      {
        renderView({
          view,
          user,
          setView,
          setUser,
        })
      }
    </Box>
  )
}

export default App
