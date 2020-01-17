import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'fetch-mock'
import { act } from 'react-dom/test-utils';

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

const mockReligions = {'Christian': ['Catholic', 'Cathar'], 'Muslim': ['Sunni', 'Zikri']};
fetchMock.get('/religions', mockReligions)

const mockCultures = { "North Germanic": ["Norse", "Swedish"], "Celtic": ["Irish", "Scottish"] }
fetchMock.get('/cultures', mockCultures)

const mockTraits = {
  default: [ 
    {
      id: 21,
      name: "Stressed",
      description: "This character finds the burdens of work and life almost too much to handle.",
      cost: -14,
      effects: {intrigue: -1, stewardship: -1, fertility: -10, health: -1, personal_combat_skill: -10},
      opposites: []
    },
    {
      id: 42,
      name: "Genius",
      description: "This character is blessed with a towering intellect.",
      cost: 30,
      effects: {martial: 5, intrigue: 5, diplomacy: 5, stewardship: 5, learning: 5, personal_combat_skill: 10, vassal_opinion: 5},
      opposites: (3) [43, 44, 45]
    },
    {
      id: 45,
      name: "Imbecile",
      description: "This character is a drooling imbecile.",
      cost: -65,
      effects: {martial: -8, intrigue: -8, diplomacy: -8, stewardship: -8, learning: -8, personal_combat_skill: -30, attraction_opinion: -30, vassal_opinion: -10},
      opposites: (3) [42, 43, 45]
    }
  ],
  education: [
    {
      id: 1,
      name: "Amateurish Plotter",
      description: "The Amateurish Plotter has received an education emphasizing intrigue skills. Unfortunately, it didn't stick.",
      cost: 0,
      effects: {intrigue: 1, stewardship: -1, personal_combat_skill: 4},
      opposites:[]
    },
    {
      id: 8,
      name: "Grey Eminence",
      description: "The Grey Eminence is the epitome of statesmenship having fully mastered the art of diplomacy.",
      cost: 14,
      effects: {martial: -1, intrigue: 2, diplomacy: 9, learning: 2, fertility: 10},
      opposites: []
    },
    {
      id: 20,
      name: "Mastermind Theologian",
      description: "The Mastermind Theologian is recognized as one of the top scholars of the Faith.",
      cost: 11,
      effects: {intrigue: -1, diplomacy: 2, stewardship: 2, learning: 9, fertility: -5},
      opposites: []
    }
  ]
}
fetchMock.get('/traits', mockTraits)