import React from 'react'
import CharacterTrait from './CharacterTrait'

export default function CharacterTraits(props) {
  return(
    <span className='float-right'
      style={{
        overflowY: 'hidden', 
        overflowX: 'auto', 
        width: 'calc(100% - 90px)', 
        maxHeight: '30px', 
        display: 'inline-block', 
        whiteSpace: 'nowrap'
      }}
    >
      {props.character.traits.map(trait => <CharacterTrait key={trait.id} trait={trait} {...props} />)}
    </span>
  )
}