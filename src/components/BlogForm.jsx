import React from 'react'
import { useState } from 'react'
export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    await createBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')

  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  return (
    <div>
      <form onSubmit={handleBlogCreation}>
        <h2>Create new</h2>
        <div>
          <label htmlFor='title'>title</label>
          <input
            type="text" id='title'
            onChange={handleTitleChange}
            value={title}
            placeholder='write title'
          />
        </div>

        <div>
          <label htmlFor='author'>author</label>
          <input type="text" id='author'
            onChange={handleAuthorChange}
            value={author}
            placeholder='write author name'
          />
        </div>

        <div>
          <label htmlFor='url'>url</label>
          <input type="text" id='url'
            onChange={handleUrlChange}
            value={url}
            placeholder='write URL'
          />
        </div>
        <button id='create-button'>create</button>
      </form>
    </div>



  )
}
