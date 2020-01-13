import React, { useEffect } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import TraitItem from './TraitItem'

export default function DefaultTraitsDropdown({traits}) {
  useEffect(() => console.log(traits))

  return(
    <Dropdown>
      <Dropdown.Toggle as={Image} src='../trait_icons/add_traits.png' />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden'}}>
        {traits.map(trait => <TraitItem key={trait.id} trait={trait} />)}
      </Dropdown.Menu>
    </Dropdown>
  )
}