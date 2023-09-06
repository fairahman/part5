import React from 'react'

export const BlogForm = ({isVisible, setIsVisible, handleBlogCreation, handleTitleChange, handleUrlChange, handleAuthorChange, title, url, author}) => {
  const showWhenVisible = {display: isVisible ? '' : 'none'}
  const hideWhenVisible = {display: isVisible ? 'none' : ''}
  
  const handleCancel = (event) => {
    event.preventDefault()
    setIsVisible(!isVisible)
  }
  return (
    <div>
      <div>
        <button onClick={() => setIsVisible(!isVisible)} style={hideWhenVisible}>create new blog</button>
      </div>
      <form style={showWhenVisible} onSubmit={handleBlogCreation}>
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>title</label>
        <input type="text" id='title' onChange={handleTitleChange} value={title}/>
      </div>
      
      <div>
        <label htmlFor='author'>author</label>
        <input type="text" id='author' onChange={handleAuthorChange} value={author}/>
      </div>
      
      <div>
        <label htmlFor='url'>url</label>
        <input type="text" id='url' onChange={handleUrlChange} value={url}/>
      </div>
      <button>create</button>
      <button onClick={handleCancel}>cancel</button>
    </form>
    </div>
    
    
    
  )
}
