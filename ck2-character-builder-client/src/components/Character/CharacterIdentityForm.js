import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

export default function CharacterIdentityForm({character, setCharacter}) {
  const handleChange = event => setCharacter({ ...character, [event.target.id]: event.target.value })

  return(
    <Form>
      <Form.Row>
        <Form.Label className='mb-0 mt-1'>Name: </Form.Label>
        <Form.Group as={Col}>
          <Form.Control id='name' onChange={handleChange} type='text' placeholder='Name' />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Label className='mb-0 mt-1'>Dynasty: </Form.Label>
        <Form.Group as={Col}>
          <Form.Control id='dynasty' onChange={handleChange} type='text' placeholder='Dynasty' />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}