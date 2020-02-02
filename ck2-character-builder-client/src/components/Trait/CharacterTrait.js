import React from 'react'
import './CharacterTrait.css'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function CharacterTrait({trait, onClick, alt}) {
  const path = `../trait_icons/${trait.nameSlug}.png`
  const popperConfig = {
    modifiers: {
      preventOverflow: { enabled: false },
      hide: { enabled: false }
    }
  }

  return(
    <OverlayTrigger 
      popperConfig={popperConfig}
      placement='bottom' 
      overlay={<Tooltip aria-label={`${trait.name} Trait Tooltip`}><TraitTooltip trait={trait} /></Tooltip>}
    >
      <Image className='d-inline-block character-trait' alt={alt} onClick={onClick} src={path} />
    </OverlayTrigger>
  )
}