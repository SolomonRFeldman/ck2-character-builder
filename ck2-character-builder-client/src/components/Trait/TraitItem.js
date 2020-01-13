import React from 'react'
import { Dropdown, Image } from 'react-bootstrap'

export default function TraitItem({trait}) {
  const path = `../trait_icons/${trait.nameSlug}.png`

  return(
    <Dropdown.Item>
      <Image src={path} className='mr-2' /> 
      {trait.name} 
      <div class="float-right ml-2">{trait.cost}</div>
    </Dropdown.Item>
  )
}