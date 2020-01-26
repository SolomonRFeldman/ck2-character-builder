import React from 'react'
import { Button } from 'react-bootstrap'

export default function CharacterSaveButton({className, character}){
  const handleClick = () => {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        character: {
          ...character,
          character_attribute: Object.keys(character.attributes).reduce((result, attr) => {
            result[attr] = character.attributes[attr].base
            return result
          }, {}),
          education_id: character.education.id,
          trait_ids: character.traits.map(trait => trait.id)
        }
      })
    }
    fetch('/characters', obj).then(resp => resp.json()).then(json => json)
  }

  return(
    <Button className={className} variant='success' onClick={handleClick} aria-label='Character Save Button'>Save</Button>
  )
}