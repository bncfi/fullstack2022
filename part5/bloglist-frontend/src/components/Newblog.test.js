import React from 'react'
import '@testing-library/jest-dom/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Newblog from './Newblog'

test('blog form', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<Newblog createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  await user.type(inputTitle, 'Tyhma kirjoitus')

  const inputAuthor = screen.getByPlaceholderText('author')
  await user.type(inputAuthor, 'Tyhma kirjoittaja')

  const inputUrl = screen.getByPlaceholderText('url')
  await user.type(inputUrl, 'url')

  const createButton = screen.getByText('save')
  expect(createButton).toBeDefined()
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toMatch('Tyhma kirjoitus')
  expect(createBlog.mock.calls[0][0].author).toMatch('Tyhma kirjoittaja')
  expect(createBlog.mock.calls[0][0].url).toMatch('url')
})
