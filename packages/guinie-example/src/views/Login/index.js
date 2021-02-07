import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { makeTestIdProps } from '@guinie/react-testid'

export const Login = ({ loginAs }) => {
  const [username, setUsername] = useState('')

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        inputProps={{ style: { textAlign: 'center' }, ...makeTestIdProps('login-form--username') }}
      />
      <Button
        onClick={() => username.length && loginAs(username)}
        {...makeTestIdProps('login-form--submit')}
      >Login</Button>
    </Box>
  )
}
