import React, { useRef } from 'react'
import { OverlayTrigger, Button, Tooltip, Image } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function TraitItem({trait, hidden, onClick, windowWidth}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  const tooltip = useRef(null)
  const item = useRef(null)

  const handleClick = () => {
    tooltip.current.hide()
    onClick()
  }

  const handleTouchMove = () => {
    tooltip.current.hide()
    if(document.activeElement) { document.activeElement.blur() }
  }
  const handleMouseEnter = () => item.current.parentNode.addEventListener("touchmove", handleTouchMove)
  const handleMouseLeave = () => item.current.parentNode.removeEventListener("touchmove", handleTouchMove)

  return(
    <OverlayTrigger 
      ref={tooltip}
      placement={windowWidth > 540 ? 'right' : 'bottom'}
      popperConfig={{
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        }
      }}
      overlay={<Tooltip aria-label={`${trait.name} ${trait.type || "Trait"} Tooltip`}><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Button
        className='dropdown-item px-3 py-1'
        ref={item}
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