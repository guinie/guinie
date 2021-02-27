const { sequence } = require('@guinie/react')

// Add todo:
// 1. type the title to text field
// 2. click submit
const addTodo = context => params => {
  const { click, type } = context
  return sequence(
    type('add-todo-form--title', params.title),
    click('add-todo-form--submit')
  )
}

// Toggle todo
// 1. click checkbox on appropriate row
const toggleTodo = context => params => {
  const { click } = context
  return sequence(
    click(`todo-list--${params.title}--toggle`)
  )
}

// Remove todo
// 1. click remove-button on appropriate row
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
