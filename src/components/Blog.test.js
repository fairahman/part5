import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import JSDOMEnvironment from 'jest-environment-jsdom'
import { BlogForm } from './BlogForm'

// describe('<Blog />', () => {
//   let container

//   beforeEach(() => {
//     const blog = {
//       title: 'grappler baki',
//       url: 'blogs.com/grappler_baki',
//       likes: 0,
//       author: 'baki',
//       user: { username: 'bakiHanma' }
//     }
//     const mockUpdateBlog = jest.fn()
//     const mockHandleDelete = jest.fn()
//     container = render(
//       <Blog blog={ blog } updateBlog={ mockUpdateBlog } handleDelete={ mockHandleDelete } />
//     ).container
//   })

//   test('renders the title and author but does not render URL or number of likes', async () => {
//     // const div = container.querySelector('#moreBlogInfo')
//     // expect(div).not.toBeDefined()
//     const titleElement = screen.getByText('grappler baki', { exact: false })
//     const authorElement = screen.getByText('baki', { exact: false })
//     const urlElement = screen.queryByText('blogs.com/grappler_baki' , { exact: false })
//     const likesElement = screen.queryByText('Likes: 0' , { exact: false })

//     expect(titleElement).toBeInTheDocument()
//     expect(authorElement).toBeInTheDocument()
//     expect(urlElement).not.toBeInTheDocument()
//     expect(likesElement).not.toBeInTheDocument()
//   })
// })

describe('Blog', () => {
  const blog = {
    id: 1,
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }
  const mockUpdateBlog = jest.fn()
  beforeEach(() => render(<Blog blog={blog} updateBlog={mockUpdateBlog} />) )

  it('initially renders only title and author', () => {

    // Check that title and author are visible
    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible()

    const moreBlogInfo = screen.getByTestId('moreBlogInfo')
    expect(moreBlogInfo).not.toBeVisible()
    // expect(moreBlogInfo).toHaveStyle({ display: 'none' })
  })
  it ('shows the URL and the number of likes are shown when button cotrolling their visibility is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('toggleBtn')
    await user.click(button)

    expect(screen.getByTestId('moreBlogInfo')).toBeVisible()
    // console.log(screen.getByTestId('moreBlogInfo').textContent)
  })
  test('if the like button is clicked twice, updateBlog event handler is called twice', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('like')
    console.log(button.textContent)
    await user.click(button)
    await user.click(button)
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)

  })
})
describe('BlogForm', () => {
  const mockCreateBlog = jest.fn()
  beforeEach(() => {
    render(<BlogForm createBlog={mockCreateBlog} />)
  })


  test('BlogForm calls the evenhandler createBlog with the right parameters', async () => {
    const titleInput = await  screen.getByPlaceholderText('write title')
    const authorInput = screen.getByPlaceholderText('write author name')
    const URLInput = screen.getByPlaceholderText('write URL')
    const createBtn = screen.getByText('create')
    // console.log('createBtn:', createBtn)
    await userEvent.type(titleInput, 'gangsta baki')
    await userEvent.type(authorInput, 'bakir baap yujiro')
    await userEvent.type(URLInput, 'blogs.com/gangsta_baki')
    await userEvent.click(createBtn)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('gangsta baki')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('bakir baap yujiro')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('blogs.com/gangsta_baki')
  })
})