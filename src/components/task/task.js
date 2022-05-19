import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TimeCreated from '../timeCreated'
import Timer from '../timer'
import './task.css'

function Task(props) {
  const [editing, setEditing] = useState(false)
  const [editLabel, setEditLabel] = useState(null)
  const {
    label,
    timeLeft,
    isActiveTimer,
    isCompleted,
    dateCreated,
    completeTask,
    deleteTask,
    editTaskLabel,
    onTimer,
    offTimer,
  } = props

  const editToggle = () => {
    setEditing(!editing)
  }

  const onChangeLabel = (e) => {
    setEditLabel(e.target.value)
  }

  const setNewLabel = (e) => {
    e.preventDefault()
    editTaskLabel(editLabel)
    editToggle()
  }

  let classNames = ''
  if (isCompleted) {
    classNames += 'completed'
  }

  if (editing) {
    classNames += ' editing'
  }

  let timer
  if (timeLeft === 'x') {
    timer = <Timer timeLeft={1} countdown={false} />
  } else if (timeLeft) {
    timer = (
      <Timer timeLeft={timeLeft} countdown={isActiveTimer} onTimer={onTimer} offTimer={(date) => offTimer(date)} />
    )
  } else {
    timer = null
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} onChange={completeTask} />
        <label htmlFor="span">
          <span className="description">{label}</span>
          {timer}
          <TimeCreated dateCreated={dateCreated} />
        </label>
        <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={editToggle} />
        <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={deleteTask} />
      </div>
      {editing && (
        <form onSubmit={setNewLabel}>
          <input type="text" className="edit" defaultValue={label} onChange={onChangeLabel} onClick={onChangeLabel} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  completeTask: PropTypes.func,
  deleteTask: PropTypes.func,
  editTaskLabel: PropTypes.func,
  timeLeft: PropTypes.number,
  isActiveTimer: PropTypes.bool,
  onTimer: PropTypes.func,
  offTimer: PropTypes.func,
}

Task.defaultProps = {
  completeTask: () => {},
  deleteTask: () => {},
  isCompleted: false,
  editTaskLabel: () => {},
  timeLeft: 0,
  isActiveTimer: false,
  onTimer: () => {},
  offTimer: () => {},
}

export default Task
