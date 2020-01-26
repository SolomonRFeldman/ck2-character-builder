import React from 'react'
import { render, within, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import CharacterCard from '../../../components/Character/CharacterCard'
import { eleanor } from '../../../__mocks__/characters_fetch'
import Character from '../../../models/Character'
import { hallow } from '../../test_models/test_characters'
import fetchMock from 'fetch-mock'

let characterCard

it(`loads a character's info into the card when a user clicks to load a character`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const characterLoadSelect = characterCard.getByLabelText('Character Load Select')
  const characterLoadButton = characterCard.getByLabelText('Character Load Button')
  const loadedChar = new Character(eleanor)

  fireEvent.change(characterLoadSelect, { target: { value: loadedChar.id} })
  await act(async () => fireEvent.click(characterLoadButton))

  const { diplomacy, health, fertility, sons } = loadedChar.attributes
  const header = characterCard.getByTestId('detailsHeader')
  const nameField = characterCard.getByPlaceholderText('Name')
  const religionField = characterCard.getByLabelText('Religion')
  const marriedField = characterCard.getByLabelText('Married')
  const sexField = characterCard.getByLabelText('Sex')
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  const healthRow = characterCard.getByText('Health', { exact: false})
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  const characterTraits = characterCard.getByLabelText('Character Traits')  
  const traitDropdown = characterCard.getByLabelText('Traits Dropdown')
  const educationDropdown = characterCard.getByLabelText('Education Dropdown')
  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))

  expect(header).toHaveTextContent(loadedChar.name)
  expect(nameField).toHaveValue(loadedChar.name)
  expect(religionField).toHaveTextContent(loadedChar.religion)
  expect(marriedField).toHaveValue(loadedChar.marriage_status.toString())
  expect(sexField).toHaveValue(loadedChar.sex)

  expect(age).toHaveTextContent(`Age: ${loadedChar.age}`)
  expect(diplomacyRow).toHaveTextContent(`${diplomacy.base} ( ${diplomacy.bonus + diplomacy.base} )`)
  expect(healthRow).toHaveTextContent(`${health.base.toFixed(2)} ( ${(health.bonus + health.base).toFixed(2)} )`)
  expect(fertilityRow).toHaveTextContent(`${fertility.base}% ( ${fertility.bonus + fertility.base}% )`)
  expect(sonsRow).toHaveTextContent(`${sons.base}`)

  expect(within(characterTraits).getByAltText('Strong')).toBeInTheDocument()
  expect(within(traitDropdown).getByText('Strong')).toBeHidden()
  expect(within(traitDropdown).getByText('Weak')).toBeHidden()

  expect(characterCard.queryByAltText('Grey Eminence Character Education')).toBeInTheDocument()
  expect(within(educationDropdown).getByText("Grey Eminence")).toBeHidden()
  expect(within(educationDropdown).getByText("Amateurish Plotter")).not.toBeHidden()
})

it('sends the correct params to the server when a user clicks the save button', async() => {
  await act(async () => characterCard = render(<CharacterCard character={hallow} />))

  const characterSaveButton = characterCard.getByLabelText('Character Save Button')
  await act(async () => fireEvent.click(characterSaveButton))

  const params = JSON.parse(fetchMock.lastOptions().body).character
  expect(params.id).toBe(undefined)
  expect(params.character_attribute).toMatchObject(hallow.character_attribute)
  expect(params.name).toBe(hallow.name)
  expect(params.marriage_status).toBe(true)
  expect(params.education_id).toBe(hallow.education.id)
  expect(params.trait_ids).toEqual(hallow.traits.map(trait => trait.id))
})

it('sends the id and other correct params to the server when a user loads a character then clicks the save button', async() => {
  await act(async () => characterCard = render(<CharacterCard />))

  const characterLoadSelect = characterCard.getByLabelText('Character Load Select')
  const characterLoadButton = characterCard.getByLabelText('Character Load Button')
  const loadedChar = new Character(eleanor)
  fireEvent.change(characterLoadSelect, { target: { value: loadedChar.id} })
  await act(async () => fireEvent.click(characterLoadButton))

  const characterSaveButton = characterCard.getByLabelText('Character Save Button')
  await act(async () => fireEvent.click(characterSaveButton))

  const params = JSON.parse(fetchMock.lastOptions().body).character
  expect(params.id).toBe(eleanor.id)
  expect(params.character_attribute).toMatchObject(eleanor.character_attribute)
  expect(params.name).toBe(eleanor.name)
  expect(params.marriage_status).toBe(eleanor.marriage_status)
  expect(params.education_id).toBe(eleanor.education.id)
  expect(params.trait_ids).toEqual(eleanor.traits.map(trait => trait.id))
})
