import React from 'react'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TraitTooltip from './TraitTooltip'

export default function CharacterEducation({character}) {
  const path = `../trait_icons/${character.education.nameSlug}.png`

  return(
    <OverlayTrigger
      popperConfig={{
        modifiers: {
          preventOverflow: { enabled: false },
          hide: { enabled: false }
        }
      }} 
      placement='bottom' 
      overlay={<Tooltip aria-label={`${character.education.name} Trait Tooltip`}><TraitTooltip trait={character.education} /></Tooltip>}
    >
      <Image alt={`${character.education.name} Character Education`} src={path} className='d-inline-block' />
    </OverlayTrigger>
  )
}