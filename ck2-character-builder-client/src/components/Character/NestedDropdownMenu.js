import React, { useEffect } from 'react'
import { Dropdown, Form, Button } from 'react-bootstrap'

export default function NestedDropDownMenu({id, handleChange, items}) {
  const handleSelect = event => {
    handleChange(event)
    event.target.value=''
  }

  const preventEvents = event => {
    event.stopPropagation()
    event.preventDefault()
  }

  return(
    <Dropdown.Menu className='px-2' onClick={event => event.stopPropagation()} style={{maxHeight: '200px', overflowX: 'hidden'}}>
      {
        Object.keys(items).map((itemGroup) => {
          return(
            <div className='dropdown-item p-0 my-2' onClick={event => event.stopPropagation()} key={itemGroup}>
              <Form.Control id={id} onClick={preventEvents} defaultValue='' onChange={handleSelect} as="select">
                <option value="" disabled hidden>{itemGroup}</option>
                {items[itemGroup].map(item => <option key={item}>{item}</option>)}
              </Form.Control>
            </div>
          )
        })
      }
    </Dropdown.Menu>
  )
}