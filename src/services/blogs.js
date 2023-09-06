import axios from 'axios'
const baseUrl = '/api/blogs'

const  getAll = async () => {
  const response = await axios.get(baseUrl)
  return  response.data
}

const create = async (title, author, url, user) => {
  console.log(title, author, url)
  const response =  await axios.post(baseUrl, { title, author, url }, { headers: { Authorization:`Bearer ${user.token}` } })
  console.log('response.data:', response.data)
  return response.data
}

export default { getAll, create }