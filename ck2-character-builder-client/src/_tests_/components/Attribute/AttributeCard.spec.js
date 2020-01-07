import React from 'react'
import { render, fireEvent, within, act, waitForDomChange } from '@testing-library/react'
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

describe(`when a user increments a basic stat`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  fireEvent.click(within(diplomacyRow).getByText('➕'))

  it('increases the display value to 6', () => {
    expect(diplomacyRow).toHaveTextContent('6 ( 6 )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 17$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the health stat`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const healthRow = characterCard.getByText('Health', { exact: false})
  fireEvent.click(within(healthRow).getByText('➕'))

  it('increases the display value to 6', () => {
    expect(healthRow).toHaveTextContent('5.10 ( 5.10 )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 17$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the fertility stat`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  fireEvent.click(within(fertilityRow).getByText('➕'))

  it('increases the display value to 55%', () => {
    expect(fertilityRow).toHaveTextContent('55% ( 55% )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 17$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the son stat`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  fireEvent.click(within(sonsRow).getByText('➕'))

  it('increases the display value to 1', () => {
    expect(sonsRow).toHaveTextContent('1')
  })
  it('increases the age by three', () => {
    expect(age).toHaveTextContent(/^Age: 19$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the daughter stat`, () => {
  const characterCard = render(<CharacterCard />)
  const age = characterCard.getByText('Age:', { exact: false })
  const daughtersRow = characterCard.getByText('Daughters', { exact: false})
  fireEvent.click(within(daughtersRow).getByText('➕'))

  it('increases the display value to 1', () => {
    expect(daughtersRow).toHaveTextContent('1')
  })
  it('increases the age by two', () => {
    expect(age).toHaveTextContent(/^Age: 18$/)
  })
  characterCard.unmount()
})