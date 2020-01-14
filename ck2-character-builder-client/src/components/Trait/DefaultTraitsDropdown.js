import React, { useState, useEffect } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import TraitItem from './TraitItem'

export default function DefaultTraitsDropdown(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return(
    <Dropdown className='d-inline-block ml-2'>
      <Dropdown.Toggle as={Image} src='../trait_icons/add_traits.png' />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden', width: '240px'}}>
        {props.traits.map(trait => <TraitItem key={trait.id} trait={trait} windowWidth={windowWidth} {...props} />)}
      </Dropdown.Menu>
    </Dropdown>
  )
}