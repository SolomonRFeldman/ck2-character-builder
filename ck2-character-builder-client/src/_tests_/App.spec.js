import React from 'react'
import { render } from '@testing-library/react'
import NavBar from '../components/NavBar/NavBar'
import App from '../App'

const app = render(<App />)

it('renders a NavBar component', () => {
  expect(app.container.innerHTML).toContain(render(<NavBar />).container.innerHTML) 
})