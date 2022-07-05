import React from 'react'
import '@testing-library/jest-dom/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blogForTest = {
  title: 'Tyhma kirjoitus',
  author: 'Tyhma kirjoittaja',
  url: 'uuuu',
  likes: 5,
  user: {
    username: 'allu',
    name: 'Aleksis Kivi',
    id: '62a9e0762dac09a822852382',
  },
  id: '62aaf2b5c4d306e83cf08454',
}

const user = {
  username: 'allu',
  name: 'Aleksis Kivi',
  id: '62a9e0762dac09a822852382',
}

test('renders title and author, not likes and url', async () => {
  render(<Blog blog={blogForTest} user={user} />)

  const title = screen.getByText('Tyhma kirjoitus')
  const author = screen.getByText('Tyhma kirjoittaja')

  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText('uuuu')
  const likes = screen.queryByText(5)

  expect(url).toHaveStyle('display: none')
  expect(likes).toHaveStyle('display: none')
})

test('after button press url and likes vissible', async () => {
  render(<Blog blog={blogForTest} user={user} />)

  const url = screen.queryByText('uuuu')
  const likes = screen.queryByText(5)

  expect(url).toHaveStyle('display: none')
  expect(likes).toHaveStyle('display: none')

  const buttonShow = screen.getByText('show')
  const userEventClick = userEvent.setup()
  await userEventClick.click(buttonShow)

  const urlAfterClick = screen.queryByText('uuuu')
  const likesAfterClick = screen.queryByText(5)

  expect(urlAfterClick).toHaveStyle('display: block')
  expect(likesAfterClick).toHaveStyle('display:block')
})

test('like button was pressed twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blogForTest} user={user} updateBlog={mockHandler} />)
  const buttonLike = screen.getByText('like')
  const userEventClick = userEvent.setup()
  await userEventClick.click(buttonLike)
  await userEventClick.click(buttonLike)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
