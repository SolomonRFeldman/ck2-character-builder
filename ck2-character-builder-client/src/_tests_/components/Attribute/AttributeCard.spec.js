import React from 'react'
import { render, fireEvent, within, wait } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'
import { act } from 'react-dom/test-utils'

const TEST_ATTR = {
  diplomacy: 7,
  martial: 8,
  stewardship: 7,
  intrigue: 9,
  learning: 6,
  health: 5.5,
  fertility: 60,
  sons: 2,
  daughters: 3
}
const TEST_AGE = 47

let characterCard

it(`when a new character's attributes are initialized`, async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  const healthRow = characterCard.getByText('Health', { exact: false})
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  const sonsRow = characterCard.getByText('Sons', { exact: false})

  expect(age).toHaveTextContent('Age: 16')
  expect(diplomacyRow).toHaveTextContent('5 ( 5 )')
  expect(healthRow).toHaveTextContent('5.00 ( 5.00 )')
  expect(fertilityRow).toHaveTextContent('50% ( 50% )')
  expect(sonsRow).toHaveTextContent('0')
})

it(`it renders attributes correctly when attributes are provided to the character card`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  const healthRow = characterCard.getByText('Health', { exact: false})
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  const sonsRow = characterCard.getByText('Sons', { exact: false})

  expect(age).toHaveTextContent('Age: 47')
  expect(diplomacyRow).toHaveTextContent('7 ( 7 )')
  expect(healthRow).toHaveTextContent('5.50 ( 5.50 )')
  expect(fertilityRow).toHaveTextContent('60% ( 60% )')
  expect(sonsRow).toHaveTextContent('2')
})

it(`when a user increments a basic stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  fireEvent.click(within(diplomacyRow).getByText('➕'))

  expect(diplomacyRow).toHaveTextContent(`${TEST_ATTR.diplomacy + 1} ( ${TEST_ATTR.diplomacy + 1} )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE + 1}`)
})

it(`when a user increments the health stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const healthRow = characterCard.getByText('Health', { exact: false})
  fireEvent.click(within(healthRow).getByText('➕'))

  expect(healthRow).toHaveTextContent(`${(TEST_ATTR.health + .10).toFixed(2)} ( ${(TEST_ATTR.health + .10).toFixed(2)} )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE + 1}`)
})

it(`when a user increments the fertility stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  fireEvent.click(within(fertilityRow).getByText('➕'))

  expect(fertilityRow).toHaveTextContent(`${TEST_ATTR.fertility + 5}% ( ${TEST_ATTR.fertility + 5}% )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE + 1}`)
})

it(`when a user increments the son stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  fireEvent.click(within(sonsRow).getByText('➕'))
  

  expect(sonsRow).toHaveTextContent(`${TEST_ATTR.sons + 1}`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE + 3}`)
})

it(`when a user increments the daughter stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const daughtersRow = characterCard.getByText('Daughters', { exact: false})
  fireEvent.click(within(daughtersRow).getByText('➕'))

  expect(daughtersRow).toHaveTextContent(`${TEST_ATTR.daughters + 1}`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE + 2}`)
})

it(`when a user decriments a basic stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  fireEvent.click(within(diplomacyRow).getByText('➖'))

  expect(diplomacyRow).toHaveTextContent(`${TEST_ATTR.diplomacy - 1} ( ${TEST_ATTR.diplomacy - 1} )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE - 1}`)
})

it(`when a user decriments the health stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const healthRow = characterCard.getByText('Health', { exact: false})
  fireEvent.click(within(healthRow).getByText('➖'))

  expect(healthRow).toHaveTextContent(`${(TEST_ATTR.health - .10).toFixed(2)} ( ${(TEST_ATTR.health - .10).toFixed(2)} )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE - 1}`)
})

it(`when a user decriments the fertility stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  fireEvent.click(within(fertilityRow).getByText('➖'))

  expect(fertilityRow).toHaveTextContent(`${TEST_ATTR.fertility - 5}% ( ${TEST_ATTR.fertility - 5}% )`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE - 1}`)
})

it(`when a user decriments the son stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  fireEvent.click(within(sonsRow).getByText('➖'))

  expect(sonsRow).toHaveTextContent(`${TEST_ATTR.sons - 1}`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE - 3}`)
})

it(`when a user decriments the daughter stat`, async() => {
  await act(async () => characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />))
  const age = characterCard.getByText('Age:', { exact: false })
  const daughtersRow = characterCard.getByText('Daughters', { exact: false})
  fireEvent.click(within(daughtersRow).getByText('➖'))

  expect(daughtersRow).toHaveTextContent(`${TEST_ATTR.daughters - 1}`)
  expect(age).toHaveTextContent(`Age: ${TEST_AGE - 2}`)
})