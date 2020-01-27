import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import DefaultTraitsDropdown from './DefaultTraitsDropdown';
import Trait from '../../models/Trait';
import CharacterTraits from './CharacterTraits';
import EducationTraitsDropdown from './EducationTraitsDropdown';
import CharacterEducation from './CharacterEducation';

export default function TraitCard(props) {
  const [defaultTraits, setDefaultTraits] = useState([])
  const [educationTraits, setEducationTraits] = useState([])

  const setEducation = education => {
    const effectiveAttributes = {}
    Object.keys(props.character.attributes).forEach(key => {
      effectiveAttributes[key] = {
        ...props.character.attributes[key], 
        bonus: props.character.attributes[key].bonus + (education.effects[key] || 0)}
    })
    props.setCharacter({
      ...props.character, 
      education: education, 
      age: props.character.age + education.cost, 
      attributes: effectiveAttributes
    })
  }

  useEffect(() => {
    fetch('/traits').then(response => response.json()).then(traits => {
      setDefaultTraits(traits.default.map((trait) => new Trait(trait)))
      const educations = traits.education.map((trait) => new Trait(trait))
      setEducationTraits(educations)
      if(!props.character.education) { setEducation(educations[0]) }
    })
  }, [])

  useEffect(() => { 
    if(props.character.education === undefined && educationTraits.length !== 0) { setEducation(educationTraits[0]) } 
  }, [props.character.education])
  
  return(
    <Card>
      <Card.Body style={{maxHeight: '65.8px'}}>
          <EducationTraitsDropdown traits={educationTraits} {...props} />
          {props.character.education ? <CharacterEducation {...props} /> : null}
          <DefaultTraitsDropdown traits={defaultTraits} {...props} />
          <CharacterTraits {...props} />
      </Card.Body>
    </Card>
  )
}