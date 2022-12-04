import { describe, expect, test } from 'vitest'
import pipe from '~/utils/lmw/pipe'

describe('App', () => {
 test('renders headline', async () => {
  const add = (input: number) => input + 2

  const result = pipe(1, add, add, add)

  expect(result).toBe(7)
 })
})
