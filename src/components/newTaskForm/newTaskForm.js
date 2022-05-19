import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

//   onLabelChange = (e) => {
//     const { target } = e
//     const { value, name } = target
//     this.setState({
//       [name]: value,
//     })
//   }

//   onSubmitForm = (e, addTask, label, min, sec) => {
//     e.preventDefault()
//     addTask(label, min, sec)
//     this.setState({
//       label: '',
//       min: '',
//       sec: '',
//     })
//   }

function NewTaskForm(props) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const { addTask } = props

  const onSubmitForm = (e) => {
    e.preventDefault()
    addTask(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmitForm}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name="label"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
        value={min}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
      />
      <input className="form-submit-button" type="submit" value="💾" />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

export default NewTaskForm
