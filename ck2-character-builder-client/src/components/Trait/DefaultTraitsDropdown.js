import React from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import DefaultTraitItem from './DefaultTraitItem'

export default function DefaultTraitsDropdown(props) {

  return(
    <Dropdown aria-label='Traits Dropdown' className='d-inline-block ml-2'>
      <Dropdown.Toggle alt='Traits Dropdown Toggle' as={Image} src='../trait_icons/add_traits.png' />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden', width: '240px'}}>
        {props.traits.map(trait => <DefaultTraitItem key={trait.id} trait={trait} {...props} />)}
      </Dropdown.Menu>
    </Dropdown>
  )
}