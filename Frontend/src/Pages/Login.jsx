import React from 'react'
import  Form  from '../Components/Form'

export const Login = () => {
  return (
   <>
   <Form route="/api/token/" method="login"/>
   </>
  )
}
