import React, { useEffect, useState } from 'react'
import { Image, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function TraitItem({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  const [hidden, setHidden] = useState(false)
  
  const handleClick = () => {
    const effectiveAttributes = {}
    Object.keys(character.attributes).forEach(key => {
      effectiveAttributes[key] = {...character.attributes[key], bonus: character.attributes[key].bonus + (trait.effects[key] || 0)}
    })
    setCharacter({
      ...character, 
      traits: [...character.traits, trait], 
      age: character.age + trait.cost, 
      attributes: effectiveAttributes
    })
  }

  const isHidden = () => character.traits.some(charTrait => (charTrait.id === trait.id) || trait.opposites.some(opposite => opposite === charTrait.id))
  useEffect(() => {
    setHidden(isHidden())
  }, [character.traits])

  return(
    <OverlayTrigger 
      placement='right' 
      popperConfig={{
        modifiers: {
          preventOverflow: {
            enabled: false
          }
        }
      }} 
      overlay={<Tooltip><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Button className='dropdown-item' onClick={handleClick} hidden={hidden} style={{overflow: 'visible'}}>
        <Image src={path} className='mr-2' /> 
        {trait.name} 
        <div className="float-right ml-2">{trait.cost}</div>
      </Button>
    </OverlayTrigger>
  )
}