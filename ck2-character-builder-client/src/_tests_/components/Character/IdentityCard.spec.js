import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
})

it('uses provided religion when provided to CharacterCard', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{religion: 'Sunni'}} />))
  expect(characterCard.getByLabelText('Religion')).toHaveTextContent('Sunni')
})
