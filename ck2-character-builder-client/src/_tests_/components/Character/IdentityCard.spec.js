import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'
import { act } from 'react-dom/test-utils'

let characterCard

it(`renders char names in the header and input when a character's name and dynasty are entered`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  fireEvent.change(dynastyField, { target: { value: 'Mann' } })
  const header = characterCard.getByTestId('detailsHeader')

  expect(header).toHaveTextContent('Marshmallow')
  expect(header).toHaveTextContent('Mann')
  expect(nameField).toHaveValue('Marshmallow')
  expect(dynastyField).toHaveValue('Mann')
})

it(`renders character names when provided to the CharCard component`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{name: 'Marshmallow', dynasty: 'Mann'}} />))
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  const header = characterCard.getByTestId('detailsHeader')

  expect(header).toHaveTextContent('Marshmallow')
  expect(header).toHaveTextContent('Mann')
  expect(nameField).toHaveValue('Marshmallow')
  expect(dynastyField).toHaveValue('Mann')
})

it(`defaults religion to catholic and culture to norse when a user is initialized`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  expect(characterCard.getByLabelText('Religion')).toHaveTextContent('Catholic')
  expect(characterCard.getByLabelText('Culture')).toHaveTextContent('Norse')
})

it('uses provided religion when provided to CharacterCard', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{religion: 'Sunni', culture: 'Irish'}} />))
  expect(characterCard.getByLabelText('Religion')).toHaveTextContent('Sunni')
  expect(characterCard.getByLabelText('Culture')).toHaveTextContent('Irish')
})

it(`can set religion and culture`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const religionField = characterCard.getByLabelText('Religion')
  const cultureField = characterCard.getByLabelText('Culture')
  const religionDropdown = characterCard.getByLabelText('Religion Dropdown')
  const cultureDropdown = characterCard.getByLabelText('Culture Dropdown')

  await act(async () => fireEvent.click(religionDropdown))
  fireEvent.change(within(religionDropdown).getByLabelText('Muslim Group'), { target: { value: "Zikri"} })
  await act(async () => fireEvent.click(cultureDropdown))
  fireEvent.change(within(cultureDropdown).getByLabelText('Celtic Group'), { target: { value: "Scottish"} })

  expect(religionField).toHaveTextContent('Zikri')
  expect(cultureField).toHaveTextContent('Scottish')
})

it(`defaults marriage status to no and sex to male when a user is initialized`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  expect(characterCard.getByLabelText('Married')).toHaveValue('false')
  expect(characterCard.getByLabelText('Sex')).toHaveValue('Male')
})

it(`displays provided marriage status and effects when provided to character card`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{marriage_status: true}} />))

  expect(characterCard.getByLabelText('Age')).toHaveTextContent('Age: 18')
  expect(characterCard.getByLabelText('Married')).toHaveValue('true')
})

it(`displays provided sex when provided to character card`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{sex: 'Female'}} />))
  expect(characterCard.getByLabelText('Sex')).toHaveValue('Female')
})

it(`can set marriage status to true and it increases age by two`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const marriedField = characterCard.getByLabelText('Married')

  fireEvent.change(marriedField, { target: { value: "true"} })

  expect(marriedField).toHaveValue('true')
  expect(characterCard.getByLabelText('Age')).toHaveTextContent('Age: 18')
})

it(`can set marriage status to false and it decreases age by two`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{marriage_status: true}} />))
  const marriedField = characterCard.getByLabelText('Married')

  fireEvent.change(marriedField, { target: { value: "false"} })

  expect(marriedField).toHaveValue('false')
  expect(characterCard.getByLabelText('Age')).toHaveTextContent('Age: 16')
})

it(`can set sex status`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const sexField = characterCard.getByLabelText('Sex')

  fireEvent.change(sexField, { target: { value: "Female"} })
  expect(sexField).toHaveValue('Female')
})