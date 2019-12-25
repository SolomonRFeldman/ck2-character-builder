import React from 'react'
import { render } from '@testing-library/react'
import NavBar from '../../components/NavBar/NavBar'

it('renders the web app name', () => {
  const navBar = render(<NavBar />)
  expect(navBar.container).toHaveTextContent('Crusader Kings II Character Builder')  
})