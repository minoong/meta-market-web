import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '~/components/atoms/button'

describe('App', () => {
 it('renders headline', async () => {
  const test = vi.fn()
  render(<Button onClick={test}>Button</Button>)

  expect(screen.getByRole('button')).toHaveTextContent('Button')
  expect(screen.getByRole('button')).toHaveClass('text-sm')

  await userEvent.click(screen.getByRole('button'))

  expect(test).toHaveBeenCalledTimes(1)
 })
})
