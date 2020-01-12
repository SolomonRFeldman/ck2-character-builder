import React, { useState, useEffect } from 'react'
import { Dropdown, Col, Form, ButtonGroup, Button } from 'react-bootstrap'
import NestedDropDownMenu from './NestedDropdownMenu'

export default function CharacterIdentityForm({character, setCharacter}) {
  const handleChange = event => setCharacter({ ...character, [event.target.id]: event.target.value })
  const [religions, setReligions] = useState({})
  const [cultures, setCultures] = useState({})

  useEffect(() => { fetch('/religions').then(response => response.json()).then(json => setReligions(json)) }, [])
  useEffect(() => { fetch('/cultures').then(response => response.json()).then(json => setCultures(json)) }, [])

  return(
    <Form>
      <Form.Row>

        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control id='name' onChange={handleChange} type='text' placeholder='Name' value={character.name}/>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label htmlFor='charReligion'>Religion</Form.Label>
          <Dropdown alignRight as={ButtonGroup} className='w-100'>
            <Button variant='outline-secondary w-75'><span id='charReligion' className='float-left'>{character.religion}</span></Button>
            <Dropdown.Toggle data-testid='religionDropdown' variant='outline-secondary' split>
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

        <Form.Group as={Col}>
          <Form.Label htmlFor='charReligion'>Culture</Form.Label>
          <Dropdown alignRight as={ButtonGroup} className='w-100'>
            <Button variant='outline-secondary w-75'><span id='charReligion' className='float-left'>{character.culture}</span></Button>
            <Dropdown.Toggle variant='outline-secondary' split>
              <NestedDropDownMenu id='culture' handleChange={handleChange} items={cultures} />
            </Dropdown.Toggle>
          </Dropdown>
        </Form.Group>

      </Form.Row>
    </Form>
  )
}