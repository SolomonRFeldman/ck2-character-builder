import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

describe(`when a character's name and dynasty are entered`, () => {
  const characterCard = render(<CharacterCard />)
  const nameField = characterCard.getByPlaceholderText('Name')
  const dynastyField = characterCard.getByPlaceholderText('Dynasty')
  fireEvent.change(nameField, { target: { value: 'Marshmallow' } })
  fireEvent.change(dynastyField, { target: { value: 'Mann' } })

  it('puts the entered name and dynasty in the header', () => {
    const header = characterCard.getByTestId('detailsHeader')
    expect(header).toHaveTextContent('Marshmallow')
    expect(header).toHaveTextContent('Mann')
  })
})