import React from 'react'
import { render } from '@testing-library/react'
import TraitTooltip from '../../../components/Trait/TraitTooltip'
import Trait from '../../../models/Trait'

const strongTrait = {
  "id": 47,
  "name": "Strong",
  "description": "This character is blessed with a powerful physique.",
  "cost": 25,
  "effects": {
    "martial": 2,
    "diplomacy": 1,
    "fertility": 10,
    "health": 1.0,
    "personal_combat_skill": 10,
    "attraction_opinion": 10,
    "vassal_opinion": 5,
    "tribal_opinion": 10
  },
  "opposites": [
    48
  ]
}

it('renders all the trait information in the tooltip', async() => {
  const toolTip = render(<TraitTooltip trait={new Trait(strongTrait)} />).baseElement
  
  expect(toolTip).toHaveTextContent("Strong")
  expect(toolTip).toHaveTextContent("This character is blessed with a powerful physique.")
  expect(toolTip).toHaveTextContent("Martial: 2")
  expect(toolTip).toHaveTextContent("Fertility: 10")
  expect(toolTip).toHaveTextContent("Health: 1")
  expect(toolTip).toHaveTextContent("Personal Combat Skill: 10")
})