const { compose, sequence } = require('@guinie/react')

const addTodo = context => params => {
  const { click, type } = context
  return sequence(
    type('add-todo-form--title', params.title),
    click('add-todo-form--submit')
  )
}

const toggleTodo = context => params => {
  const { click } = context
  return sequence(
    click(`todo-list--${params.title}--toggle`)
  )
}

const removeTodo = context => params => {
  const { click } = context
  return sequence(
    click(`todo-list--${params.title}--remove`)
  )
}

module.exports = {
  addTodo,
  toggleTodo,
  removeTodo,
}
