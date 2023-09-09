import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input onChange={handleUsernameChange} type="text" id='username' value = {username}/>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input onChange={handlePasswordChange} type='text' id='password' value={password}/>
      </div>
      <button>submit</button>
    </form>
  )
}

LoginForm.propTypes = {
  login : PropTypes.func.isRequired
}
