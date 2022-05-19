import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList/taskList'
import Footer from '../footer/footer'

import './app.css'

function App() {
  let maxId = 10

  function createTaskItem(label, timeLeft) {
    return {
      label,
      isCompleted: false,
      dateCreated: new Date(),
      timeLeft,
      isActiveTimer: false,
      // eslint-disable-next-line no-plusplus
      id: maxId++,
    }
  }

  const [tasks, setTasks] = useState([
    createTaskItem('Completed task'),
    createTaskItem('Editing task'),
    createTaskItem('Active task'),
  ])

  const [filter, setFilter] = useState('all')

  function idxSearch(id) {
    return tasks.findIndex((item) => item.id === id)
  }

  const completeTask = (id) => {
    setTasks(() => {
      const idx = idxSearch(id)
      const newItem = { ...tasks[idx], isCompleted: !tasks[idx].isCompleted }
      return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
    })
  }

  const deleteTask = (id) => {
    setTasks(() => {
      const idx = idxSearch(id)
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  const deleteCompleted = () => {
    setTasks(() => {
      const newItems = tasks.filter((item) => !item.isCompleted)
      return newItems
    })
  }

  function filterItems() {
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((item) => !item.isCompleted)
      case 'completed':
        return tasks.filter((item) => item.isCompleted)
      default:
        return tasks
    }
  }

  const addTask = (label, min, sec) => {
    if (!label) return
    const timeLeft = (Number(min) * 60 + Number(sec)) * 1000
    setTasks(() => [...tasks, createTaskItem(label, timeLeft)])
  }

  const editTaskLabel = (id, label) => {
    setTasks(() => {
      const idx = idxSearch(id)
      const newItem = { ...tasks[idx], label }
      return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
    })
  }

  const toggleFilterState = (value) => {
    setFilter(value)
  }

  const turnOnTimer = (id) => {
    setTasks(() => {
      const idx = idxSearch(id)
      const newItem = { ...tasks[idx], isActiveTimer: true }
      return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
    })
  }

  const turnOffTimer = (id, date) => {
    setTasks(() => {
      const idx = idxSearch(id)
      const newItem = { ...tasks[idx], timeLeft: date, isActiveTimer: false }
      return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
    })
  }

  const visibleItems = filterItems(filter)
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={visibleItems}
          completeTask={completeTask}
          deleteTask={deleteTask}
          editTaskLabel={editTaskLabel}
          turnOnTimer={turnOnTimer}
          turnOffTimer={turnOffTimer}
        />
      </section>
      <Footer tasks={tasks} deleteTask={deleteCompleted} toggleFilterState={toggleFilterState} filter={filter} />
    </section>
  )
}

export default App
