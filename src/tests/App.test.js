import {fireEvent, render, screen} from '@testing-library/react'
import App from '../App'

test('renders App', () => {
  const app = render(<App/>)
  expect(app.baseElement).toMatchSnapshot()
})

test('renders input with working handler', () => {
  render(<App/>)
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()

  const testText = 'any text'
  fireEvent.change(input, {target: {value: testText}})
  expect(input.value).toBe(testText)
})

test('call fetch on app start', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ({})})

  render(<App/>)

  expect(fetch.mock.calls.length).toBe(1)

  jest.clearAllMocks();
})