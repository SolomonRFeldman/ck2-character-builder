import React from 'react'
import { Button } from 'react-bootstrap'

export default function SaveCharacterButton({className, character, setCharacter, characters, setCharacters, setSelectedChar}){
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
    fetch('/characters', obj).then(resp => resp.json()).then(json => {
      if(!character.id) { setCharacter({...character, id: json.id}) }
      const characterIndex = characters.findIndex(charToUpdate => charToUpdate.id === json.id)
      let newCharacters
      if(characterIndex !== -1) {
        newCharacters = [...characters]
        newCharacters[characterIndex] = json
      } else {
        newCharacters = [json, ...characters]
      }
      setCharacters(newCharacters)
      setSelectedChar(json.id)
    })
  }

  return(
    <Button className={className} variant='success' onClick={handleClick} aria-label='Save Character Button'>Save</Button>
  )
}