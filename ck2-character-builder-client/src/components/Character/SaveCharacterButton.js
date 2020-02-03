import React from 'react'
import { Button } from 'react-bootstrap'

export default function SaveCharacterButton({
  className, 
  character, 
  setCharacter, 
  characters, 
  setCharacters, 
  setSelectedChar, 
  setServerError
}){
  const handleClick = () => {
    const preparedChar = {
      ...character,
      character_attribute: Object.keys(character.attributes).reduce((result, attr) => {
        result[attr] = character.attributes[attr].base
        return result
      }, {}),
      education_id: character.education.id,
      trait_ids: character.traits.map(trait => trait.id)
    }

    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        character: preparedChar
      })
    }

    fetch('/characters', obj).then(resp => { if(resp.ok) { return resp.json() } else { throw resp } }).then(json => {
      setCharacter({...character, id: json.id, errors: {} })
      setServerError()
      const characterIndex = characters.findIndex(charToRemove => charToRemove.id === json.id)
      if(characterIndex !== -1) { characters.splice(characterIndex, 1) }
      const newCharacters = [json, ...characters]
      setCharacters(newCharacters)
      setSelectedChar(json.id)
    }).catch(response => {
      response.status === 400 ?
        response.json().then(json => setCharacter({ ...character, errors: json.errors.character })) :
        setServerError('failed to reach server')
    })
  }

  return(
    <Button className={className} variant='success' onClick={handleClick} aria-label='Save Character Button'>Save</Button>
  )
}