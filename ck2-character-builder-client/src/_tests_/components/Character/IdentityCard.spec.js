import React from 'react'
import { render, fireEvent, wait, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

it(`renders char info in the header when a character's name and dynasty are entered`, async() => {
  const characterCard = render(<CharacterCard />)
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  fireEvent.change(dynastyField, { target: { value: 'Mann' } })
  const header = characterCard.getByTestId('detailsHeader')
  await wait()

  expect(header).toHaveTextContent('Marshmallow')
  expect(header).toHaveTextContent('Mann')
})

it(`renders character info when provided to the CharCard compoenent`, async() => {
  const characterCard = render(<CharacterCard character={{name: 'Marshmallow', dynasty: 'Mann'}} />)
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  const header = characterCard.getByTestId('detailsHeader')
  await wait()

  expect(header).toHaveTextContent('Marshmallow')
  expect(header).toHaveTextContent('Mann')
  expect(nameField).toHaveValue('Marshmallow')
  expect(dynastyField).toHaveValue('Mann')
})

it(`defaults religion to catholic when a user is initialized`, async() => {
  const characterCard = render(<CharacterCard />)
  await wait()

  expect(characterCard.getByLabelText('Religion')).toHaveTextContent('Catholic')
})

it('uses provided religion when provided to CharacterCard', async() => {
  const characterCard = render(<CharacterCard character={{religion: 'Sunni'}} />)
  await wait()

  expect(characterCard.getByLabelText('Religion')).toHaveTextContent('Sunni')
})
