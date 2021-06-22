import React, { useState } from 'react'
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import Checkbox from '../../components/Checkbox'
import { makeTestIdProps } from '@guinie/react-native-testid'
import { styles } from '../styles'

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
    <View style={[styles.container, styles.topDownLayout]}>
      <Text>{`${user}'s todos`}</Text>
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={value => setTitle(value)}
          style={[styles.grow, styles.textInput, styles.control]}
          { ...makeTestIdProps('add-todo-form--title') }
        />
        <Button
          title="Add todo"
          onPress={() => { addTodo(title); setTitle('') }}
          style={[styles.noGrow, styles.control]}
          {...makeTestIdProps('add-todo-form--submit')}
        />
      </View>
      <ScrollView {...makeTestIdProps('todo-list--container')}>
      {
        todos.map((todo, i) => {
          return (
            <View style={styles.row} key={`todo-item--${todo.id}`}>
              <Checkbox
                value={todo.finished}
                onValueChange={() => toggleTodo(todo)}
                style={styles.noGrow}
                {...makeTestIdProps(`todo-list--${todo.title}--toggle`)}
              />
              <Text
                style={styles.grow}
                {...makeTestIdProps(`todo-list--${todo.title}--title`)}
              >{todo.title}</Text>
              <Button
                title="Remove"
                onPress={() => removeTodo(todo)}
                style={[styles.noGrow, styles.control]}
                {...makeTestIdProps(`todo-list--${todo.title}--remove`)}
              />
            </View>
          )
        })
      }
      </ScrollView>
    </View>
  )
}
