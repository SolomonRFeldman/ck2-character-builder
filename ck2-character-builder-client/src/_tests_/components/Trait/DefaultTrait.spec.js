import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'
import { act } from 'react-dom/test-utils'
import { DEFAULT_AGE, DEFAULT_ATTR } from '../../constants'

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
  fireEvent.click(traitItem)

  expect(traitItem).not.toBeVisible()
  expect(within(characterTraits).getByAltText('Strong')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE + 25}`)
  expect(characterDiplomacy).toHaveTextContent(`${DEFAULT_ATTR.diplomacy} ( ${DEFAULT_ATTR.diplomacy + 1} )`)
  expect(characterHealth).toHaveTextContent(`${DEFAULT_ATTR.health.toFixed(2)} ( ${(DEFAULT_ATTR.health + 1).toFixed(2)} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility + 10}% )`)
})