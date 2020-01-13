import React, { useEffect } from 'react'
import { Dropdown, Image } from 'react-bootstrap'

export default function DefaultTraitsDropdown(props) {
  return(
    <Dropdown>
      <Dropdown.Toggle as={Image} src='../trait_icons/add_traits.png' />
      <Dropdown.Menu>

      </Dropdown.Menu>
    </Dropdown>
  )
}