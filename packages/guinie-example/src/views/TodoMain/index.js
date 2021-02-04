import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography as T,
} from '@material-ui/core'
import { makeTestIdProps } from '@guinie/react'

const getId = (() => {
  let id = 1
  return () => id++
})()

export const TodoMain = ({ user }) => {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  const makeTodo = title => ({
    title,
    finished: false,
    id: getId()
  })
  const addTodo = title => {
    const newTodos = [
      makeTodo(title),
      ...todos
    ]
    setTodos(newTodos)
  }
  const removeTodo = todo => {
    const { id } = todo
    const newTodos = todos.filter(t => t.id !== id)
    setTodos(newTodos)
  }
  const toggleTodo = todo => {
    const { id } = todo
    const newTodo = {
      ...todo,
      finished: !todo.finished
    }
    const newTodos = todos.map(t => t.id === id ? newTodo : t)
    setTodos(newTodos)
  }
  return (
    <Box>
      <T variant="h1">{`${user}'s todos`}</T>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" justifyContent="center" width="50%">
          <TextField
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ ...makeTestIdProps('add-todo-form--title') }}
          />
          <Button
            onClick={() => { addTodo(title); setTitle('') }}
            {...makeTestIdProps('add-todo-form--submit')}
          >Add todo</Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        {
          todos.map((todo, i) => (
            <Box key={`todo-item--${todo.title}--${i}`} display="flex" width="50%" flexDirection="row">
              <Checkbox
                checked={todo.finished}
                onChange={() => toggleTodo(todo)}
                inputProps={{...makeTestIdProps(`todo-list--${todo.title}--toggle`)}}
              />
              <T
                style={{ alignSelf: 'center', flexGrow: 1 }}
                variant="body1"
                onClick={() => toggleTodo(todo)}
                {...makeTestIdProps(`todo-list--${todo.title}--title`)}
              >{todo.title}</T>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => removeTodo(todo)}
                {...makeTestIdProps(`todo-list--${todo.title}--remove`)}
              >Remove</Button>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}
