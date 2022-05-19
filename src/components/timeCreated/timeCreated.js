import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

function Clock(props) {
  const { date, setDate } = useState(new Date())

  useEffect(() => {
    const timerInterval = setInterval(setDate, 1000)
    return () => clearTimeout(timerInterval)
  })

  const { dateCreated } = props
  return (
    <span className="created">
      created{' '}
      {formatDistanceToNow(dateCreated, date, {
        includeSeconds: true,
      })}{' '}
      ago
    </span>
  )
}

Clock.propTypes = {
  dateCreated: PropTypes.objectOf(PropTypes.string),
}

Clock.defaultProps = {
  dateCreated: new Date(),
}

export default Clock
