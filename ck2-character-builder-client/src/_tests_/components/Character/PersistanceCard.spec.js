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

it(`adds the character to the load select when a user clicks the save button`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={hallow} />))
  const loadedChar = new Character(hallow)

  const characterSaveButton = characterCard.getByLabelText('Character Save Button')
  const characterLoadSelect = characterCard.getByLabelText('Character Load Select')
  const characterLoadButton = characterCard.getByLabelText('Character Load Button')

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

  await act(async () => fireEvent.click(characterSaveButton))

  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  const religionDropdown = characterCard.getByLabelText('Religion Dropdown')
  fireEvent.change(marriedField, { target: { value: "false"} })
  fireEvent.change(sexField, { target: { value: "Male"} })
  await act(async () => fireEvent.click(religionDropdown))
  fireEvent.change(within(religionDropdown).getByLabelText('Christian Group'), { target: { value: "Catholic"} })
  fireEvent.click(within(diplomacyRow).getByText('➕'))
  fireEvent.click(within(healthRow).getByText('➕'))
  fireEvent.click(within(fertilityRow).getByText('➕'))
  fireEvent.click(within(sonsRow).getByText('➕'))
  fireEvent.click(within(characterTraits).getByAltText('Stressed'))
  fireEvent.click(within(educationDropdown).getByText('Amateurish Plotter'))

  fireEvent.change(characterLoadSelect, { target: { value: 0 } })
  await act(async () => fireEvent.click(characterLoadButton))

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

  expect(within(characterTraits).getByAltText('Stressed')).toBeInTheDocument()
  expect(within(traitDropdown).getByText('Stressed')).toBeHidden()

  expect(characterCard.queryByAltText('Mastermind Theologian Character Education')).toBeInTheDocument()
  expect(within(educationDropdown).getByText("Mastermind Theologian")).toBeHidden()
  expect(within(educationDropdown).getByText("Amateurish Plotter")).not.toBeHidden()
})

it(`updates the character to the load select when a user clicks the save button with a loaded character`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))

  const characterLoadSelect = characterCard.getByLabelText('Character Load Select')
  const characterLoadButton = characterCard.getByLabelText('Character Load Button')
  const loadedChar = new Character(eleanor)
  fireEvent.change(characterLoadSelect, { target: { value: loadedChar.id} })
  await act(async () => fireEvent.click(characterLoadButton))

  const characterSaveButton = characterCard.getByLabelText('Character Save Button')

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
  const religionDropdown = characterCard.getByLabelText('Religion Dropdown')
  await act(async () => fireEvent.click(within(traitDropdown).getByAltText('Traits Dropdown Toggle')))
  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))

  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  fireEvent.change(marriedField, { target: { value: "false"} })
  fireEvent.change(sexField, { target: { value: "Male"} })
  await act(async () => fireEvent.click(religionDropdown))
  fireEvent.change(within(religionDropdown).getByLabelText('Muslim Group'), { target: { value: "Sunni"} })
  fireEvent.click(within(diplomacyRow).getByText('➕'))
  fireEvent.click(within(healthRow).getByText('➕'))
  fireEvent.click(within(fertilityRow).getByText('➕'))
  fireEvent.click(within(sonsRow).getByText('➕'))
  fireEvent.click(within(characterTraits).getByAltText('Strong'))
  fireEvent.click(within(traitDropdown).getByText('Stressed'))
  fireEvent.click(within(educationDropdown).getByText('Mastermind Theologian'))

  await act(async () => fireEvent.click(characterSaveButton))

  fireEvent.change(nameField, { target: { value: 'Eeep' } })
  fireEvent.change(marriedField, { target: { value: "true"} })
  fireEvent.change(sexField, { target: { value: "Female"} })
  await act(async () => fireEvent.click(religionDropdown))
  fireEvent.change(within(religionDropdown).getByLabelText('Christian Group'), { target: { value: "Catholic"} })
  fireEvent.click(within(diplomacyRow).getByText('➕'))
  fireEvent.click(within(healthRow).getByText('➕'))
  fireEvent.click(within(fertilityRow).getByText('➕'))
  fireEvent.click(within(sonsRow).getByText('➕'))
  fireEvent.click(within(characterTraits).getByAltText('Stressed'))
  fireEvent.click(within(educationDropdown).getByText('Amateurish Plotter'))

  fireEvent.change(characterLoadSelect, { target: { value: 2 } })
  await act(async () => fireEvent.click(characterLoadButton))

  expect(header).toHaveTextContent('Marshmallow')
  expect(nameField).toHaveValue('Marshmallow')
  expect(religionField).toHaveTextContent('Sunni')
  expect(marriedField).toHaveValue("false")
  expect(sexField).toHaveValue("Male")

  expect(age).toHaveTextContent(`Age: ${loadedChar.age - 38}`)
  expect(diplomacyRow).toHaveTextContent(`${diplomacy.base + 1} ( ${diplomacy.bonus + diplomacy.base - 7} )`)
  expect(healthRow).toHaveTextContent(`${(health.base + .1).toFixed(2)} ( ${(health.bonus + health.base - 1.9).toFixed(2)} )`)
  expect(fertilityRow).toHaveTextContent(`${fertility.base + 5}% ( ${fertility.bonus + fertility.base - 30}% )`)
  expect(sonsRow).toHaveTextContent(`${sons.base + 1}`)

  expect(within(characterTraits).getByAltText('Stressed')).toBeInTheDocument()
  expect(within(traitDropdown).getByText('Stressed')).toBeHidden()
  expect(within(traitDropdown).getByText('Strong')).not.toBeHidden()

  expect(characterCard.queryByAltText('Mastermind Theologian Character Education')).toBeInTheDocument()
  expect(within(educationDropdown).getByText("Mastermind Theologian")).toBeHidden()
  expect(within(educationDropdown).getByText("Amateurish Plotter")).not.toBeHidden()
})

it('assignes character an id on save so a second save request sends with an id', async() => {
  await act(async () => characterCard = render(<CharacterCard character={hallow} />))

  const characterSaveButton = characterCard.getByLabelText('Character Save Button')
  await act(async () => fireEvent.click(characterSaveButton))
  await act(async () => fireEvent.click(characterSaveButton))

  const params = JSON.parse(fetchMock.lastOptions().body).character
  expect(params.id).toBe(0)
})