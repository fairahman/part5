import React from 'react'

export const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input onChange={handleUsernameChange} type="text" id='username' value = {username}/>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input type='text' id='password'/>
      </div>
      <button>submit</button>
      
    </form>
  )
}
