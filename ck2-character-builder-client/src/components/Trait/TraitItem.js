import React, { useEffect, useState, useRef } from 'react'
import { Image, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function TraitItem({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  const [hidden, setHidden] = useState(false)
  const tooltip = useRef(null)
  const item = useRef(null)
  
  const handleClick = () => {
    tooltip.current.hide()
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

  const handleTouchMove = () => {
    tooltip.current.hide()
    if(document.activeElement) { document.activeElement.blur() }
  }
  const handleMouseEnter = () => item.current.parentNode.addEventListener("touchmove", handleTouchMove)
  const handleMouseLeave = () => item.current.parentNode.removeEventListener("touchmove", handleTouchMove)

  return(
    <OverlayTrigger 
      ref={tooltip}
      placement={window.innerWidth > 540 ? 'right' : 'bottom'}
      popperConfig={{
        modifiers: {
          preventOverflow: {
            enabled: false
          }
        }
      }}
      overlay={<Tooltip><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Button 
        className='dropdown-item px-3 py-1'
        ref={item}
        onTouchMove={() => tooltip.current.hide()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick} 
        hidden={hidden} 
        style={{overflow: 'visible', touchAction: 'manipulation'}}
      >
        <Image src={path} className='mr-2' /> 
        {trait.name} 
        <div className="float-right ml-2">{trait.cost}</div>
      </Button>
    </OverlayTrigger>
  )
}