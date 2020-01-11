import React from 'react'
import { render, wait } from '@testing-library/react'
import NavBar from '../components/NavBar/NavBar'
import App from '../App'

it('renders a NavBar component', async() => {
  const app = render(<App />)
  expect(app.container.innerHTML).toContain(render(<NavBar />).container.innerHTML) 
  await wait()
})