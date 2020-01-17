import React from 'react'
import { render, fireEvent, within, wait } from '@testing-library/react'
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

it(`displays provided marriage status, sex, and effects when provided to character card`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{marriage_status: true, sex: 'Female'}} />))

  expect(characterCard.getByLabelText('Age')).toHaveTextContent('Age: 18')
  expect(characterCard.getByLabelText('Married')).toHaveValue('true')
  expect(characterCard.getByLabelText('Sex')).toHaveValue('Female')
})