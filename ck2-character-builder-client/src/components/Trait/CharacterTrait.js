import React from 'react'
import { Image } from 'react-bootstrap'

export default function CharacterTrait({trait, character, setCharacter}) {
  const path = `../trait_icons/${trait.nameSlug}.png`

  return(
    <Image src={path} className='d-inline-block' />
  )
}