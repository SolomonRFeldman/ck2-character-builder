export const eleanor = {
  "id": 2,
  "name": "Eleanor",
  "dynasty": "de Bourges",
  "marriage_status": true,
  "culture": "Scottish",
  "religion": "Cathar",
  "sex": "Female",
  "education_id": 8,
  "character_attribute": {
    "diplomacy": 7,
    "martial": 8,
    "stewardship": 7,
    "intrigue": 9,
    "learning": 6,
    "health": 5.5,
    "fertility": 60,
    "sons": 2,
    "daughters": 3
  },
  "education": {
    "id": 8,
    "name": "Grey Eminence",
    "description": "The Grey Eminence is the epitome of statesmenship having fully mastered the art of diplomacy.",
    "cost": 14,
    "effects": {
      "martial": -1,
      "intrigue": 2,
      "diplomacy": 9,
      "learning": 2,
      "fertility": 10
    },
    "opposites": [
      
    ]
  },
  "traits": [
    {
      "id": 47,
      "name": "Strong",
      "description": "This character is blessed with a powerful physique.",
      "cost": 25,
      "effects": {
        "martial": 2,
        "diplomacy": 1,
        "fertility": 10,
        "health": 1.0,
        "personal_combat_skill": 10,
        "attraction_opinion": 10,
        "vassal_opinion": 5,
        "tribal_opinion": 10
      },
      "opposites": [
        48
      ]
    }
  ]
}

export const sigurd = {
  "id": 3,
  "name": "Sigurd",
  "dynasty": "af Munso",
  "marriage_status": false,
  "culture": "Swedish",
  "religion": "Catholic",
  "sex": "Male",
  "education_id": 1,
  "character_attribute": {
    "diplomacy": 5,
    "martial": 19,
    "stewardship": 10,
    "intrigue": 7,
    "learning": 5,
    "health": 5.0,
    "fertility": 50,
    "sons": 0,
    "daughters": 0
  },
  "education": {
    "id": 1,
    "name": "Amateurish Plotter",
    "description": "The Amateurish Plotter has received an education emphasizing intrigue skills. Unfortunately, it didn't stick.",
    "cost": 0,
    "effects": {
      "intrigue": 1,
      "stewardship": -1,
      "personal_combat_skill": 4
    },
    "opposites": [
      
    ]
  },
  "traits": [
    {
      "id": 21,
      "name": "Stressed",
      "description": "This character finds the burdens of work and life almost too much to handle.",
      "cost": -14,
      "effects": {
        "intrigue": -1,
        "stewardship": -1,
        "fertility": -10,
        "health": -1.0,
        "personal_combat_skill": -10
      },
      "opposites": [
        
      ]
    }
  ]
}

export default [sigurd, eleanor]