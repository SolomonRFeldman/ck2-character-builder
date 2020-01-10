import React, { useState, useEffect } from 'react'
import { Dropdown, Col, Form, ButtonGroup, Button } from 'react-bootstrap'
import NestedDropDownMenu from './NestedDropdownMenu'

export default function CharacterIdentityForm({character, setCharacter}) {
  const handleChange = event => setCharacter({ ...character, [event.target.id]: event.target.value })
  const [religions, setReligions] = useState({})

  useEffect(() => { fetch('/religions').then(response => response.json()).then(json => setReligions(json)) }, [])

  return(
    <Form>
      <Form.Row>

        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control id='name' onChange={handleChange} type='text' placeholder='Name' value={character.name}/>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Religion</Form.Label>
          <Dropdown alignRight as={ButtonGroup} className='w-100'>
            <Button variant='outline-secondary w-75'><span className='float-left'>{character.religion}</span></Button>
            <Dropdown.Toggle variant='outline-secondary' split>
              <NestedDropDownMenu id='religion' handleChange={handleChange} items={religions} />
            </Dropdown.Toggle>
          </Dropdown>
        </Form.Group>

      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
        <Form.Label>Dynasty</Form.Label>
          <Form.Control id='dynasty' onChange={handleChange} type='text' placeholder='Dynasty' value={character.dynasty} />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}