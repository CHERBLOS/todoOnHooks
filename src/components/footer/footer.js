import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'

function Footer(props) {
  const { tasks, deleteTask, toggleFilterState, filter } = props

  const buttonList = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonList.map((button) => {
    const isActive = filter === button.name ? 'selected' : ''
    return (
      <li key={button.name}>
        <button
          type="button"
          className={isActive}
          name={button.name}
          onClick={(e) => toggleFilterState(e.target.innerText.toLowerCase())}
        >
          {button.label}
        </button>
      </li>
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">{tasks.filter((task) => !task.isCompleted).length} items left</span>
      <ul className="filters">{buttons}</ul>
      <button type="button" className="clear-completed" onClick={deleteTask}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape),
  deleteTask: PropTypes.func,
  toggleFilterState: PropTypes.func,
  filter: PropTypes.string,
}

Footer.defaultProps = {
  tasks: {},
  deleteTask: () => {},
  toggleFilterState: () => {},
  filter: 'all',
}

export default Footer
