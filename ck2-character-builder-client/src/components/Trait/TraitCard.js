import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import DefaultTraitsDropdown from './DefaultTraitsDropdown';
import Trait from '../../models/Trait';

export default function TraitCard(props) {
  const [defaultTraits, setDefaultTraits] = useState([])

  useEffect(() => {
    fetch('/traits').then(response => response.json()).then(traits => {
      setDefaultTraits(traits.default.map((trait) => new Trait(trait)))
    })
  }, [])
  
  return(
    <Card>
      <Card.Body>
        <DefaultTraitsDropdown traits={defaultTraits} {...props} />
      </Card.Body>
    </Card>
  )
}