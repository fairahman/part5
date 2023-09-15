import { useState } from 'react'

function Blog({ blog, updateBlog, handleDelete, user }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isVisible, setIsVisible] = useState(false)
  // console.log(blog)
  const toggleView = () => {
    setIsVisible(!isVisible)
  }
  const incrementLikes = () => {
    updateBlog(blog)
  }
  const deleteBlog = () => {
    const confirmDelete = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (!confirmDelete) return
    console.log('blog id:', blog.id)
    handleDelete(blog.id)
  }
  const showWhenVisible = isVisible ? '' : 'none'
  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView} data-testid='toggleBtn'>{isVisible ? 'hide' : 'view'}</button> <br/>
      <div style={{ display: showWhenVisible }} data-testid='moreBlogInfo'>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={incrementLikes}>like</button><br/>
        {blog.user.username}<br/>
        {blog.user.username === user.username ?<button onClick={deleteBlog}>remove</button> : null}
      </div>

    </div>)
}

export default Blog