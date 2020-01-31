import React from 'react'
import { Dropdown, Form } from 'react-bootstrap'

export default function NestedDropDownMenu({id, handleChange, items}) {
  const handleSelect = event => {
    handleChange(event)
    event.target.value=''
  }

  return(
    <Dropdown.Menu className='px-2' onClick={event => event.stopPropagation()} style={{maxHeight: '200px', overflowX: 'hidden'}}>
      {
        Object.keys(items).map((itemGroup) => {
          return(
            <div className='dropdown-item p-0 my-2' key={itemGroup}>
              <Form.Control
                id={id}
                aria-label={`${itemGroup} Group`}
                defaultValue=''
                onChange={handleSelect}
                as="select"
              >
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