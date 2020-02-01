import React from 'react'
import { Dropdown, Image } from 'react-bootstrap'

export default function TraitsDropdown(props) {
  const typeDisplay = props.type[0].toUpperCase() + props.type.slice(1) + 's'

  return(
    <Dropdown
      className={props.className}
      aria-label={`${typeDisplay} Dropdown`}
      show={props.show}
      onToggle={props.onToggle}
    >
      <Dropdown.Toggle alt={`${typeDisplay} Dropdown Toggle`} as={Image} src={`../trait_icons/add_${props.type}.png`} />
      <Dropdown.Menu style={{maxHeight: '200px', overflowX: 'hidden', width: '270px'}}>
        {props.children}
      </Dropdown.Menu>
    </Dropdown>
  )
}

TraitsDropdown.defaultProps = { type: 'trait' }