import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('creates a note and shows it in the collection', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByPlaceholderText('Title'), 'First note')
    await user.type(screen.getByPlaceholderText('Content'), 'This is the content.')
    await user.click(screen.getByRole('button', { name: 'ADD NOTE' }))

    expect(screen.getByText('First note')).toBeInTheDocument()
    expect(screen.getByText('This is the content.')).toBeInTheDocument()
    expect(screen.getByText('1 Note')).toBeInTheDocument()
  })

  it('edits and deletes an existing note', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByPlaceholderText('Title'), 'Draft note')
    await user.type(screen.getByPlaceholderText('Content'), 'Original body')
    await user.click(screen.getByRole('button', { name: 'ADD NOTE' }))

    await user.click(screen.getByRole('button', { name: 'Edit note Draft note' }))
    expect(screen.getByRole('button', { name: 'SAVE CHANGES' })).toBeInTheDocument()

    const titleInput = screen.getByPlaceholderText('Title')
    const contentInput = screen.getByPlaceholderText('Content')

    await user.clear(titleInput)
    await user.clear(contentInput)
    await user.type(titleInput, 'Updated note')
    await user.type(contentInput, 'Updated body')
    await user.click(screen.getByRole('button', { name: 'SAVE CHANGES' }))

    expect(screen.getByText('Updated note')).toBeInTheDocument()
    expect(screen.getByText('Updated body')).toBeInTheDocument()
    expect(screen.queryByText('Draft note')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete note Updated note' }))

    expect(screen.getByText('Empty space. Fill it with ideas.')).toBeInTheDocument()
  })

  it('persists notes and lets the theme toggle change mode', async () => {
    const user = userEvent.setup()

    const { unmount } = render(<App />)

    await user.type(screen.getByPlaceholderText('Title'), 'Saved note')
    await user.type(screen.getByPlaceholderText('Content'), 'Stored locally')
    await user.click(screen.getByRole('button', { name: 'ADD NOTE' }))

    expect(screen.getByText('Saved note')).toBeInTheDocument()

    unmount()

    render(<App />)

    expect(screen.getByText('Saved note')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })
})