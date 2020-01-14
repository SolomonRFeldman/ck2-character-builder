import React, { useState, useEffect } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import EducationItem from './EducationItem'

export default function EducationTraitsDropdown(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return(
    <Dropdown className='d-inline-block mr-2 float-left'>
      <Dropdown.Toggle as={Image} src='../trait_icons/add_education.png' />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden', width: '270px'}}>
        {props.traits.map(trait => <EducationItem key={trait.id} trait={trait} windowWidth={windowWidth} {...props} />)}
      </Dropdown.Menu>
    </Dropdown>
  )
}