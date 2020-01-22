import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'
import { act } from 'react-dom/test-utils'
import { DEFAULT_AGE, DEFAULT_ATTR } from '../../constants'

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

let characterCard

it('adds a trait to the character when a user clicks a trait in the dropdown', async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const traitDropdown = characterCard.getByLabelText('Traits Dropdown')
  const characterTraits = characterCard.getByLabelText('Character Traits')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterDiplomacy = within(characterAttrs).getByText('Diplomacy', { exact: false })
  const characterHealth = within(characterAttrs).getByText('Health', { exact: false })
  const characterFertility = within(characterAttrs).getByText('Fertility', { exact: false })

  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  const traitItem = within(traitDropdown).getByText('Strong')
  const traitOpposite = within(traitDropdown).getByText('Weak')
  fireEvent.click(traitItem)

  expect(traitItem).toBeHidden()
  expect(traitOpposite).toBeHidden()
  expect(within(characterTraits).getByAltText('Strong')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE + 25}`)
  expect(characterDiplomacy).toHaveTextContent(`${DEFAULT_ATTR.diplomacy} ( ${DEFAULT_ATTR.diplomacy + 1} )`)
  expect(characterHealth).toHaveTextContent(`${DEFAULT_ATTR.health.toFixed(2)} ( ${(DEFAULT_ATTR.health + 1).toFixed(2)} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility + 10}% )`)
})

it('parses the effects when the character provided to the characterCard has a trait', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{traits: [strongTrait]}} />))
  const traitDropdown = characterCard.getByLabelText('Traits Dropdown')
  const characterTraits = characterCard.getByLabelText('Character Traits')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterDiplomacy = within(characterAttrs).getByText('Diplomacy', { exact: false })
  const characterHealth = within(characterAttrs).getByText('Health', { exact: false })
  const characterFertility = within(characterAttrs).getByText('Fertility', { exact: false })

  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  const traitItem = within(traitDropdown).getByText('Strong')
  const traitOpposite = within(traitDropdown).getByText('Weak')

  expect(traitItem).toBeHidden()
  expect(traitOpposite).toBeHidden()
  expect(within(characterTraits).getByAltText('Strong')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE + 25}`)
  expect(characterDiplomacy).toHaveTextContent(`${DEFAULT_ATTR.diplomacy} ( ${DEFAULT_ATTR.diplomacy + 1} )`)
  expect(characterHealth).toHaveTextContent(`${DEFAULT_ATTR.health.toFixed(2)} ( ${(DEFAULT_ATTR.health + 1).toFixed(2)} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility + 10}% )`)
})

it('parses the effects when a trait is removed', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{traits: [strongTrait]}} />))
  const traitDropdown = characterCard.getByLabelText('Traits Dropdown')
  const characterTraits = characterCard.getByLabelText('Character Traits')
  const characterTrait = within(characterTraits).getByAltText('Strong')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterDiplomacy = within(characterAttrs).getByText('Diplomacy', { exact: false })
  const characterHealth = within(characterAttrs).getByText('Health', { exact: false })
  const characterFertility = within(characterAttrs).getByText('Fertility', { exact: false })

  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  const traitItem = within(traitDropdown).getByText('Strong')
  const traitOpposite = within(traitDropdown).getByText('Weak')
  fireEvent.click(characterTrait)

  expect(traitItem).not.toBeHidden()
  expect(traitOpposite).not.toBeHidden()
  expect(characterTrait).not.toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE}`)
  expect(characterDiplomacy).toHaveTextContent(`${DEFAULT_ATTR.diplomacy} ( ${DEFAULT_ATTR.diplomacy} )`)
  expect(characterHealth).toHaveTextContent(`${DEFAULT_ATTR.health.toFixed(2)} ( ${(DEFAULT_ATTR.health).toFixed(2)} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility}% )`)
})

it('pops up trait tooltip when a trait item is hovered over', async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const traitDropdown = characterCard.getByLabelText('Traits Dropdown')

  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  const traitItem = within(traitDropdown).getByText('Strong')
  await act(async () => fireEvent.mouseOver(traitItem))

  expect(characterCard.queryByLabelText('Strong Trait Tooltip')).toBeInTheDocument()
})

it('pops up trait tooltip when a character trait is hovered over', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{traits: [strongTrait]}} />))
  const characterTraits = characterCard.getByLabelText('Character Traits')
  const characterTrait = within(characterTraits).getByAltText('Strong')
  await act(async () => fireEvent.mouseOver(characterTrait))

  expect(characterCard.queryByLabelText('Strong Trait Tooltip')).toBeInTheDocument()
})