import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

describe(`when a new character's attributes are initialized`, () => {
  const characterCard = render(<CharacterCard />)

  it('displays the proper default age of 16', () => {
    expect(characterCard.getByText('Age:', { exact: false })).toHaveTextContent(/^Age: 16$/)
  })
})