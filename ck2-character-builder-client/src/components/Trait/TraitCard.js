import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import DefaultTraitsDropdown from './DefaultTraitsDropdown';
import Trait from '../../models/Trait';
import CharacterDefaultTraits from './CharacterDefaultTraits';
import EducationTraitsDropdown from './EducationTraitsDropdown';
import CharacterTrait from './CharacterTrait';

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return(
    <Card>
      <Card.Body style={{maxHeight: '65.8px'}}>
          <EducationTraitsDropdown traits={educationTraits} windowWidth={windowWidth} {...props} />
          {props.character.education && 
          <CharacterTrait trait={props.character.education} alt={`${props.character.education.name} Character Education`} />}
          <DefaultTraitsDropdown traits={defaultTraits} windowWidth={windowWidth} {...props} />
          <CharacterDefaultTraits {...props} />
      </Card.Body>
    </Card>
  )
}