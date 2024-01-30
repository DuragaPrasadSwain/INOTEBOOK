import React, { useState } from 'react'
import AlertContext from './alertContext'

const AlertState = (props) => {

    const [alert,setalert] = useState({color:null,mess:null,act:null})
    const inalert = (Color,Mess,Act)=>{

        setalert({color:Color,mess:Mess,act:Act})

    }

  return (
    <AlertContext.Provider value = {{alert,inalert}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
