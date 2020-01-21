import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import CharacterCard from '../../../components/Character/CharacterCard'
import { act } from 'react-dom/test-utils'
import { DEFAULT_AGE, DEFAULT_ATTR } from '../../constants'

const mastermindTrait = {
  id: 20,
  name: "Mastermind Theologian",
  description: "The Mastermind Theologian is recognized as one of the top scholars of the Faith.",
  cost: 11,
  effects: { intrigue: -1, diplomacy: 2, stewardship: 2, learning: 9, fertility: -5 },
  opposites: []
}

let characterCard

it('parses the effects of the characters default education', async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const educationDropdown = characterCard.getByLabelText('Education Dropdown')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterStewardship = within(characterAttrs).getByText('Stewardship', { exact: false })
  const characterIntrigue = within(characterAttrs).getByText('Intrigue', { exact: false })

  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))
  const educationItem = within(educationDropdown).getByText('Amateurish Plotter')

  expect(educationItem).toBeHidden()
  expect(characterCard.queryByAltText('Amateurish Plotter Character Education')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE}`)
  expect(characterStewardship).toHaveTextContent(`${DEFAULT_ATTR.stewardship} ( ${DEFAULT_ATTR.stewardship - 1} )`)
  expect(characterIntrigue).toHaveTextContent(`${DEFAULT_ATTR.intrigue} ( ${DEFAULT_ATTR.intrigue + 1} )`)
})

it('parses the effects when a user selects an education', async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const educationDropdown = characterCard.getByLabelText('Education Dropdown')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterStewardship = within(characterAttrs).getByText('Stewardship', { exact: false })
  const characterIntrigue = within(characterAttrs).getByText('Intrigue', { exact: false })
  const characterLearning = within(characterAttrs).getByText('Learning', { exact: false })
  const characterFertility = within(characterAttrs).getByText('Fertility', { exact: false })

  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))
  const prevEducationItem = within(educationDropdown).getByText('Amateurish Plotter')
  const educationItem = within(educationDropdown).getByText('Mastermind Theologian')
  fireEvent.click(educationItem)

  expect(educationItem).toBeHidden()
  expect(prevEducationItem).not.toBeHidden()
  expect(characterCard.queryByAltText('Mastermind Theologian Character Education')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE + 11}`)
  expect(characterStewardship).toHaveTextContent(`${DEFAULT_ATTR.stewardship} ( ${DEFAULT_ATTR.stewardship + 2} )`)
  expect(characterIntrigue).toHaveTextContent(`${DEFAULT_ATTR.intrigue} ( ${DEFAULT_ATTR.intrigue - 1} )`)
  expect(characterLearning).toHaveTextContent(`${DEFAULT_ATTR.learning} ( ${DEFAULT_ATTR.learning + 9} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility - 5}% )`)
})

it('parses the effects when an education is provided to the CharacterCard', async() => {
  await act(async () => characterCard = render(<CharacterCard character={{education: mastermindTrait}} />))
  const educationDropdown = characterCard.getByLabelText('Education Dropdown')
  const characterAttrs = characterCard.getByLabelText('Attribute Card')
  const characterStewardship = within(characterAttrs).getByText('Stewardship', { exact: false })
  const characterIntrigue = within(characterAttrs).getByText('Intrigue', { exact: false })
  const characterLearning = within(characterAttrs).getByText('Learning', { exact: false })
  const characterFertility = within(characterAttrs).getByText('Fertility', { exact: false })

  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))
  const prevEducationItem = within(educationDropdown).getByText('Amateurish Plotter')
  const educationItem = within(educationDropdown).getByText('Mastermind Theologian')

  expect(educationItem).toBeHidden()
  expect(prevEducationItem).not.toBeHidden()
  expect(characterCard.queryByAltText('Mastermind Theologian Character Education')).toBeInTheDocument()
  expect(characterCard.getByLabelText('Age')).toHaveTextContent(`Age: ${DEFAULT_AGE + 11}`)
  expect(characterStewardship).toHaveTextContent(`${DEFAULT_ATTR.stewardship} ( ${DEFAULT_ATTR.stewardship + 2} )`)
  expect(characterIntrigue).toHaveTextContent(`${DEFAULT_ATTR.intrigue} ( ${DEFAULT_ATTR.intrigue - 1} )`)
  expect(characterLearning).toHaveTextContent(`${DEFAULT_ATTR.learning} ( ${DEFAULT_ATTR.learning + 9} )`)
  expect(characterFertility).toHaveTextContent(`${DEFAULT_ATTR.fertility}% ( ${DEFAULT_ATTR.fertility - 5}% )`)
})

it('pops up trait tooltip when a trait item is hovered over', async() => {
  await act(async () => characterCard = render(<CharacterCard />))
  const educationDropdown = characterCard.getByLabelText('Education Dropdown')

  await act(async () => fireEvent.click(within(educationDropdown).getByAltText('Education Dropdown Toggle')))
  const educationItem = within(educationDropdown).getByText('Mastermind Theologian')
  await act(async () => fireEvent.mouseOver(educationItem))

  expect(characterCard.queryByLabelText('Mastermind Theologian Education Tooltip')).toBeInTheDocument()
})