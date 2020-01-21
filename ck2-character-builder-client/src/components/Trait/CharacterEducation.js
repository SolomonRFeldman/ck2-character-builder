import React from 'react'
import { Image } from 'react-bootstrap'

export default function CharacterEducation({character}) {
  const path = `../trait_icons/${character.education.nameSlug}.png`

  return(
    <Image alt={`${character.education.name} Character Education`} src={path} className='d-inline-block' />
  )
}