import React from 'react'
import Card from "react-bootstrap/Card";
import DefaultTraitsDropdown from './DefaultTraitsDropdown';

export default function TraitCard(props) {
  return(
    <Card>
      <Card.Body>
        <DefaultTraitsDropdown />
      </Card.Body>
    </Card>
  )
}