import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import axios from 'axios'
import loginService from  './services/login'
import { BlogForm } from './components/BlogForm'
import { Message } from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
 const [title, setTitle] = useState('')
 const [author, setAuthor] = useState('')
 const [url, setUrl] = useState('')
 const [message, setMessage] = useState(null)
 const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
   const user =  window.localStorage.getItem('user') 
   console.log(user)
   if (user) setUser(JSON.parse(user))
  }, [])

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
  const handleLogin = async (event) => {
    event.preventDefault()
    // need to pass username and password that should be set in the state
    try {
      const user = await loginService.login(username, password)
      console.log('useR', user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(title, author, url, user)
      console.log('newBlog', newBlog)
      setBlogs([...blogs, newBlog])
      setMessage(`a new blog ${newBlog.title} has been added!`)
      setTimeout(() => setMessage(null), 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    catch(error) {
      console.log(error.response)
      // handling session timeout
      if (error.response.data.error === 'jwt expired') {
        window.localStorage.removeItem('user') 
        setUser(null)
      }
      
    } 
  }
  return (
    <div>
      {user ? 
      <div>
        <h2>blogs</h2>
        <Message message={message}/>
        <h3>{user.username} logged in <button onClick={handleLogout}>logout</button></h3> 
        <BlogForm isVisible={isVisible} setIsVisible={setIsVisible} handleBlogCreation={handleBlogCreation} handleTitleChange={handleTitleChange} handleUrlChange={handleUrlChange} handleAuthorChange={handleAuthorChange} title={title} url={url} author={author}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div> : 
      <div>
        <Message message={message}/>
        <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}/>
      </div>
      }
    </div>
    
  )
}

export default App