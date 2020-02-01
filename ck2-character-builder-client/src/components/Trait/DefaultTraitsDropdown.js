import React from 'react'
import DefaultTraitItem from './DefaultTraitItem'
import TraitsDropdown from './TraitsDropdown'

export default function DefaultTraitsDropdown(props) {
  return(
    <TraitsDropdown className='d-inline-block ml-2'>
      {props.traits.map(trait => <DefaultTraitItem key={trait.id} trait={trait} {...props} />)}
    </TraitsDropdown>
  )
}