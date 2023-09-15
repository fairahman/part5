import React from 'react'

export const Message = ({ message }) => {
  const style = {
    color: 'red',
    border: 'solid',
    padding: '5px'

  }
  // console.log('message:', message)
  return (
  
    <h2 id='notification' style={message ? style : {}}>
      {message}
    </h2>
  )
}
