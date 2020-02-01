import React, { useState } from 'react'
import EducationItem from './EducationItem'
import TraitsDropdown from './TraitsDropdown'

export default function EducationTraitsDropdown(props) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(false)

  return(
    <TraitsDropdown 
      className='d-inline-block mr-2 float-left'
      type="education" 
      show={show} 
      onToggle={value => setShow(value)}
    >
      {props.traits.map(trait => <EducationItem key={trait.id} trait={trait} onClick={handleClick} {...props} />)}
    </TraitsDropdown>
  )
}