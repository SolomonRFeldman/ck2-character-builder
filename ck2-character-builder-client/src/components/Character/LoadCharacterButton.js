import React from 'react'
import { Button } from 'react-bootstrap'
import Character from '../../models/Character'

export default function LoadCharacterButton({characters, selectedChar, setCharacter, className}){
  const handleClick = () => setCharacter(new Character(characters.find(character => character.id === parseInt(selectedChar))))

  return(
    <Button className={className} variant='secondary' onClick={handleClick} aria-label='Load Character Button'>Load</Button>
  )
}