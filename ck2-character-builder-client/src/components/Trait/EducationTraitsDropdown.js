import React, { useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import EducationItem from './EducationItem'

export default function EducationTraitsDropdown(props) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(false)

  return(
    <Dropdown 
      className='d-inline-block mr-2 float-left' 
      aria-label='Education Dropdown' 
      show={show} 
      onToggle={value => setShow(value)}
    >
      <Dropdown.Toggle alt='Education Dropdown Toggle' as={Image} src='../trait_icons/add_education.png' />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden', width: '270px'}}>
        {props.traits.map(trait => {
          return <EducationItem key={trait.id} trait={trait} onClick={handleClick} {...props} />
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}