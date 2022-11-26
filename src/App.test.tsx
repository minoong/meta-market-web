import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App', () => {
 it('renders headline', async () => {
  render(<App />)

  expect(screen.getByRole('heading')).toHaveTextContent('Vite + React')
  await userEvent.click(screen.getByRole('button'))
 })
})
