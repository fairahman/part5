console.log('mui at blogsService')
import axios from 'axios'
const baseUrl = '/api/blogs'


const  getAll = async () => {
  const response = await axios.get(baseUrl)
  return  response.data
}

const create = async (noteObj, user) => {
  console.log(noteObj)
  console.log('kitaa')
  try {
    const response =  await axios.post(baseUrl, noteObj, { headers: { Authorization:`Bearer ${user.token}` } })
    console.log('response.data:', response.data)
    return response.data
  }
  catch(error) {
    console.log('error at create:', error )
    throw error
  }
}

const update = async (blog) => {
  try {
    const id = blog.id

    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log('blog before update:', blogToUpdate)
    console.log('blog.user:', blogToUpdate.user)

    blogToUpdate.likes = Number(blog.likes) + 1

    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
    return response.data
  }
  catch(error) {
    console.log('error at updateBlog:', error)
  }
}
const deleteBlog = async (blogId, user) => {
  try {
    const token = `Bearer ${user.token}`
    console.log('token at deleteBlog:', token)
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(baseUrl + '/' + blogId, config)
    console.log('response at delete', response)
    return response.data
  }
  catch(error) {
    console.log('error at catch:', error)
    return error.response.data
  }
}

export default { getAll, create, update, deleteBlog }