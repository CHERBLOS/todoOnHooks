import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import lightFormat from 'date-fns/lightFormat'

function Timer(props) {
  const { onTimer, offTimer, timeLeft, countdown } = props
  const [date, setDate] = useState(timeLeft)
  const [endOfTimerDate, setEndOfTimerDate] = useState(Date.now() + timeLeft)

  const tick = () => {
    if (!countdown) return
    const newTimeLeft = endOfTimerDate - Date.now()
    if (newTimeLeft <= 1000) {
      offTimer('x')
    }
    setDate(newTimeLeft)
  }

  useEffect(() => {
    const timerInterval = setInterval(() => tick(), 1000)
    return () => clearTimeout(timerInterval)
  })

  const timerOff = () => {
    offTimer(date)
  }

  const timerOn = () => {
    if (countdown) return
    setEndOfTimerDate(Date.now() + timeLeft)
    onTimer()
  }

  return (
    <span className="created">
      <button type="button" className="icon icon-play" onClick={timerOn} aria-label="start countdown" />{' '}
      <button type="button" className="icon icon-pause" onClick={timerOff} aria-label="stop countdown" />
      {lightFormat(new Date(date), ' mm-ss')}
    </span>
  )
}

Timer.defaultProps = {
  onTimer: () => {},
  offTimer: () => {},
  timeLeft: 0,
  countdown: false,
}

Timer.propTypes = {
  onTimer: PropTypes.func,
  offTimer: PropTypes.func,
  timeLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  countdown: PropTypes.bool,
}

export default Timer
