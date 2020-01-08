import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'

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

describe(`when attributes are provided to the character card`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  const healthRow = characterCard.getByText('Health', { exact: false})
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  const sonsRow = characterCard.getByText('Sons', { exact: false})

  it('displays the proper age of 47', () => {
    expect(age).toHaveTextContent(/^Age: 47$/)
  })

  it('displays the proper value of 7 for a default attr', () => {
    expect(diplomacyRow).toHaveTextContent('7 ( 7 )')
  })

  it('displays the proper value of 5.50 for the health attr', () => {
    expect(healthRow).toHaveTextContent('5.50 ( 5.50 )')
  })

  it('displays the proper value of 60% for the fertility attr', () => {
    expect(fertilityRow).toHaveTextContent('60% ( 60% )')
  })

  it('displays the proper value of 2 for a child attr', () => {
    expect(sonsRow).toHaveTextContent('2')
  })
  characterCard.unmount()
})

describe(`when a user increments a basic stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  fireEvent.click(within(diplomacyRow).getByText('➕'))

  it('increases the display value by 1', () => {
    expect(diplomacyRow).toHaveTextContent('8 ( 8 )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 48$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the health stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const healthRow = characterCard.getByText('Health', { exact: false})
  fireEvent.click(within(healthRow).getByText('➕'))

  it('increases the display value by .1', () => {
    expect(healthRow).toHaveTextContent('5.60 ( 5.60 )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 48$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the fertility stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  fireEvent.click(within(fertilityRow).getByText('➕'))

  it('increases the display value by 5%', () => {
    expect(fertilityRow).toHaveTextContent('65% ( 65% )')
  })
  it('increases the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 48$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the son stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  fireEvent.click(within(sonsRow).getByText('➕'))

  it('increases the display value by one', () => {
    expect(sonsRow).toHaveTextContent('3')
  })
  it('increases the age by three', () => {
    expect(age).toHaveTextContent(/^Age: 50$/)
  })
  characterCard.unmount()
})

describe(`when a user increments the daughter stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const daughtersRow = characterCard.getByText('Daughters', { exact: false})
  fireEvent.click(within(daughtersRow).getByText('➕'))

  it('increases the display value by one', () => {
    expect(daughtersRow).toHaveTextContent('4')
  })
  it('increases the age by two', () => {
    expect(age).toHaveTextContent(/^Age: 49$/)
  })
  characterCard.unmount()
})

describe(`when a user decriments a basic stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const diplomacyRow = characterCard.getByText('Diplomacy', { exact: false})
  fireEvent.click(within(diplomacyRow).getByText('➖'))

  it('reduces the display value by 1', () => {
    expect(diplomacyRow).toHaveTextContent('6 ( 6 )')
  })
  it('reduces the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 46$/)
  })
  characterCard.unmount()
})

describe(`when a user decriments the health stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const healthRow = characterCard.getByText('Health', { exact: false})
  fireEvent.click(within(healthRow).getByText('➖'))

  it('reduces the display value by .1', () => {
    expect(healthRow).toHaveTextContent('5.40 ( 5.40 )')
  })
  it('reduces the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 46$/)
  })
  characterCard.unmount()
})

describe(`when a user decriments the fertility stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const fertilityRow = characterCard.getByText('Fertility', { exact: false})
  fireEvent.click(within(fertilityRow).getByText('➖'))

  it('reduces the display value by 5%', () => {
    expect(fertilityRow).toHaveTextContent('55% ( 55% )')
  })
  it('reduces the age by one', () => {
    expect(age).toHaveTextContent(/^Age: 46$/)
  })
  characterCard.unmount()
})

describe(`when a user decriments the son stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const sonsRow = characterCard.getByText('Sons', { exact: false})
  fireEvent.click(within(sonsRow).getByText('➖'))

  it('reduces the display value by one', () => {
    expect(sonsRow).toHaveTextContent('1')
  })
  it('reduces the age by three', () => {
    expect(age).toHaveTextContent(/^Age: 44$/)
  })
  characterCard.unmount()
})

describe(`when a user decriments the daughter stat`, () => {
  const characterCard = render(<CharacterCard character={{character_attribute: TEST_ATTR}} />)
  const age = characterCard.getByText('Age:', { exact: false })
  const daughtersRow = characterCard.getByText('Daughters', { exact: false})
  fireEvent.click(within(daughtersRow).getByText('➖'))

  it('reduces the display value by one', () => {
    expect(daughtersRow).toHaveTextContent('2')
  })
  it('reduces the age by two', () => {
    expect(age).toHaveTextContent(/^Age: 45$/)
  })
  characterCard.unmount()
})