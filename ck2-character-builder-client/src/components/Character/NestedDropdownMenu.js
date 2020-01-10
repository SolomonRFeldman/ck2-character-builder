import React, { useEffect } from 'react'
import { Dropdown, Form } from 'react-bootstrap'

export default function NestedDropDownMenu({id, handleChange, items}) {
  const handleSelect = event => {
    handleChange(event)
    console.log(event.target.parent)
    event.target.value=''
  }

  const preventEvents = event => {
    event.stopPropagation()
    event.preventDefault()
  }
  useEffect(() => console.log(items))

  return(
    <Dropdown.Menu>
      {
        Object.keys(items).map((itemGroup) => {
          return(
            <Dropdown.Item key={itemGroup} onClick={event => event.preventDefault()} className='px-1'>
              <Form.Control id={id} onClick={preventEvents} defaultValue='' onChange={handleSelect} as="select">
                <option value="" disabled hidden>{itemGroup}</option>
                {items[itemGroup].map(item => <option key={item}>{item}</option>)}
              </Form.Control>
            </Dropdown.Item>
          )
        })
      }
    </Dropdown.Menu>
  )
}