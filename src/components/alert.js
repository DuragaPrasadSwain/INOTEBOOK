import React, { useContext } from 'react'
import alertContext from '../context/alerts/alertContext'

const Alert = () => {
  const context = useContext(alertContext)
  const {alert,inalert} = context
  setTimeout(() => {
    inalert("","",false)
  }, 4000);
  return (

  <div className={`alert alert-${alert.color}`} role="alert">{alert.mess}</div>

  )
}

export default Alert
