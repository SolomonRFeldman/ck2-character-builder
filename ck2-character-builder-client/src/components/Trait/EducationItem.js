import React, { useEffect, useState, useRef } from 'react'
import { Image, OverlayTrigger, Tooltip, Button, Dropdown } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function EducationItem({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  const [hidden, setHidden] = useState(false)
  const tooltip = useRef(null)
  const item = useRef(null)
  
  const handleClick = () => {
    tooltip.current.hide()
    const effectiveAttributes = {}
    Object.keys(character.attributes).forEach(key => {
      effectiveAttributes[key] = {
        ...character.attributes[key], 
        bonus: character.attributes[key].bonus + (trait.effects[key] || 0) + (-character.education.effects[key] || 0)
      }
    })
    setCharacter({
      ...character, 
      education: trait, 
      age: character.age + trait.cost - character.education.cost, 
      attributes: effectiveAttributes
    })
  }

  const isHidden = () => character.education && character.education.id === trait.id
  useEffect(() => {
    setHidden(isHidden())
  }, [character.education])
  
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
      overlay={<Tooltip><TraitTooltip trigger={tooltip} trait={trait} /></Tooltip>}
    >
      <Dropdown.Item
        className='px-3 py-1'
        ref={item}
        onTouchMove={() => tooltip.current.hide()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick} 
        hidden={hidden} 
        style={{overflow: 'visible', touchAction: 'manipulation'}}
      >
        <Image src={path} className='mr-2'/> 
        {trait.name} 
        <div className="float-right ml-2">{trait.cost}</div>
      </Dropdown.Item>
    </OverlayTrigger>
  )
}