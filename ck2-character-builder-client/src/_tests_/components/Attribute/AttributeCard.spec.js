import React from 'react'
import { render } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

describe(`when a new character's attributes are initialized`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  const healthRow = characterCard.getByText('Health', { exact: false})
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  const sonsRow = characterCard.getByText('Sons', { exact: false})

  it('displays the proper default age of 16', () => {
    expect(age).toHaveTextContent(/^Age: 16$/)
  })

  it('displays the proper default value of 5 for a default attr', () => {
    expect(diplomacyRow).toHaveTextContent('5 ( 5 )')
  })

  it('displays the proper default value of 5.00 for the health attr', () => {
    expect(healthRow).toHaveTextContent('5.00 ( 5.00 )')
  })

  it('displays the proper default value of 50% for the fertility attr', () => {
    expect(fertilityRow).toHaveTextContent('50% ( 50% )')
  })

  it('displays the proper default value of 0 for a child attr', () => {
    expect(sonsRow).toHaveTextContent('0')
  })
  characterCard.unmount()
})
