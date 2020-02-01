import React from 'react'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function CharacterTrait({trait, onClick, alt}) {
  const path = `../trait_icons/${trait.nameSlug}.png`

  return(
    <OverlayTrigger 
      popperConfig={{
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        }
      }} 
      placement='bottom' 
      overlay={<Tooltip aria-label={`${trait.name} Trait Tooltip`}><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Image alt={alt} onClick={onClick} src={path} style={{touchAction: 'manipulation'}} className='d-inline-block' />
    </OverlayTrigger>
  )
}