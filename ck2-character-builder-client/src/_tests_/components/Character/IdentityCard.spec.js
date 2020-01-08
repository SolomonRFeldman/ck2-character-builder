import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

describe(`when a character's name and dynasty are entered`, () => {
  const characterCard = render(<CharacterCard />)
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  fireEvent.change(dynastyField, { target: { value: 'Mann' } })
  const header = characterCard.getByTestId('detailsHeader')

  it('puts the entered name and dynasty in the header', () => {
    expect(header).toHaveTextContent('Marshmallow')
    expect(header).toHaveTextContent('Mann')
  })
  characterCard.unmount()
})

describe(`when a character's name and dynasty are provided to a character card component`, () => {
  const characterCard = render(<CharacterCard character={{name: 'Marshmallow', dynasty: 'Mann'}} />)
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  const header = characterCard.getByTestId('detailsHeader')

  it('puts the given name and dynasty in the header', () => {
    expect(header).toHaveTextContent('Marshmallow')
    expect(header).toHaveTextContent('Mann')
  })
  it('puts the given name and dynasty in the input boxes', () => {
    expect(nameField).toHaveValue('Marshmallow')
    expect(dynastyField).toHaveValue('Mann')
  })
  characterCard.unmount()
})