console.log('mui at App.jsx')
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import axios from 'axios'
import loginService from  './services/login'
import { BlogForm } from './components/BlogForm'
import { Message } from './components/Message'
import { Toggleable } from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlogs = async () => {
      console.log('my dumass is at the getAll useeffect rn')
      const blogs = await blogService.getAll()
      setBlogs( blogs.sort((a,b) => a.likes - b.likes) )
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const user =  window.localStorage.getItem('user')
    //  console.log(user)
    if (user) setUser(JSON.parse(user))
  }, [])

  console.log('blogs at App:', blogs)

  const login = async (username, password) => {

    // need to pass username and password that should be set in the state
    try {
      const user = await loginService.login(username, password)
      console.log('useR', user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setMessage(`Welcome! ${user.name || user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(error) {
      console.log(error.response.data)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addBlog = async (noteObj) => {
    try {
      const newBlog = await blogService.create(noteObj, user)
      console.log('newBlog', newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, newBlog])
      setMessage(`a new blog ${newBlog.title} has been added!`)
      setTimeout(() => setMessage(null), 5000)
    }
    catch(error) {
      console.log('error', error)
      // handling session timeout
      if (error.response.data.error === 'jwt expired') {
        console.log('jwt expired at line 73')
        window.localStorage.removeItem('user')
        setUser(null)
      }
    }
  }
  const updateBlog = async (blog) => {
    const updatedBlog = await blogService.update(blog)
    console.log('updatedBlog:', updatedBlog)
    setBlogs (
      blogs
        .map(blog => blog.title === updatedBlog.title ? updatedBlog : blog)
        .sort((a, b) => a.likes - b.likes)
    )
  }

  const handleDelete = async (blogId) => {
    const theDeletedBlog = await blogService.deleteBlog(blogId, user)
    if(theDeletedBlog.error === 'jwt expired') {
      window.localStorage.removeItem('user')
      setUser(null)
    }
    setBlogs(blogs.filter(blog => {
      console.log('blog.title:', blog.title, 'theDeletedBlog.title:', theDeletedBlog.title )
      return blog.title !== theDeletedBlog.title
    }))
  }
  return (
    <div>
      {user ?
        <div>
          <h2>blogs</h2>
          <Message message={message}/>
          <h3>{user.username} logged in <button onClick={handleLogout}>logout</button></h3>

          <Toggleable ref = {blogFormRef}  buttonLabel={'create new'}>
            <BlogForm createBlog = {addBlog}/>
          </Toggleable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} handleDelete={handleDelete} />
          )}
        </div> :
        <div>
          <Message message={message}/>
          <Toggleable buttonLabel={'login'}>
            <LoginForm login={login}/>
          </Toggleable>
        </div>
      }
    </div>
  )
}

export default App