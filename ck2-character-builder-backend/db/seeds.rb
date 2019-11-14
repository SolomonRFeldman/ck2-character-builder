# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

traits = [
  {
    name: "Stressed",
    description: <<~DESC.strip,
      This character finds the burdens of work and life almost too much to handle.
    DESC
    cost: -14,
    effects: {
      intrigue: -1,
      stewardship: -1,
      fertility: -10,
      health: -1.00,
      personal_combat_skill: -10
    }
  },

  {
    name: "Depressed",
    description: <<~DESC.strip,
      Life has lost its luster to this character.
    DESC
    cost: -15,
    effects: {
      martial: -1,
      intrigue: -1,
      diplomacy: -1,
      stewardship: -1,
      fertility: -5,
      health: -1.00,
      personal_combat_skill: -5
    }
  },

  {
    name: "Lunatic",
    description: <<~DESC.strip,
      This character is stark raving mad.
    DESC
    cost: -8,
    effects: {
      attraction_opinion: -10,
      vassal_opinion: -5,
      same_trait_opinion: 5
    }
  },

  {
    name: "Possessed",
    description: <<~DESC.strip,
      This character experiences frequent violent episodes, \
      speaking in tongues, spitting, and assulting those nearby, as if possessed by evil spirits.
    DESC
    cost: -3,
    effects: {
      personal_combat_skill: 5,
      attraction_opinion: -10,
      same_trait_opinion: 5
    }
  },

  {
    name: "Has Great Pox",
    description: <<~DESC.strip,
      This character suffers from 'Great Pox', the venereal plague, later known as Syphilis.
    DESC
    cost: -39,
    effects: {
      general_opinion: -5,
      martial: -1,
      intrigue: -1,
      diplomacy: -1,
      stewardship: -1,
      learning: -1,
      fertility: -20,
      health: -2.00,
      attraction_opinion: -10
    }
  },

  {
    name: "Leper",
    description: <<~DESC.strip,
      Afflicted with the horror that is leprosy, this character is experiencing Purgatory on Earth. \
      Hideous and sterile, procreation is most unlikely.
    DESC
    cost: -62,
    effects: {
      general_opinion: -20,
      personal_combat_skill: -25,
      fertility: -95,
      health: -1.50,
      attraction_opinion: -15
    }
  },

  {
    name: "Wounded",
    description: <<~DESC.strip,
      This character has been seriously injured, but the damage should heal, given time.
    DESC
    cost: -11,
    effects: {
      martial: -1,
      health: -1.00,
      personal_combat_skill: -15
    },
    opposites: [
      "Maimed"
    ]
  },

  {
    name: "Maimed",
    description: <<~DESC.strip,
      This character has been maimed. It would take a true miracle to heal such an injury.
    DESC
    cost: -27,
    effects: {
      martial: -2,
      health: -2.00,
      personal_combat_skill: -30,
      attraction_opinion: -15,
      same_trait_opinion: 5
    },
    opposites: [
      "Wounded"
    ]
  },

  {
    name: "Infirm",
    description: <<~DESC.strip,
      This character is infirm and suffers from a sickly disposition.
    DESC
    cost: -31,
    effects: {
      martial: -3,
      intrigue: -3,
      diplomacy: -3,
      stewardship: -3,
      learning: -3,
      fertility: -30,
      health: -1.00,
      personal_combat_skill: -50
    }
  },

  {
    name: "Incapable",
    description: <<~DESC.strip,
      Due to advanced age, head injury or other mental disabilities, \
      this character is not fit for any kind of work. \
      Incapable rulers must employ a regent.
    DESC
    cost: -66,
    effects: {
      martial: -6,
      intrigue: -6,
      diplomacy: -6,
      stewardship: -6,
      learning: -6,
      fertility: -30,
      health: -3.00,
      personal_combat_skill: -100
    }
  },

  {
    name: "Drunkard",
    description: <<~DESC.strip,
      This character is a drunken sot.
    DESC
    cost: -5,
    effects: {
      stewardship: -2,
      personal_combat_skill: -10,
      church_opinion: -5,
      attraction_opinion: -5,
      same_trait_opinion: 5
    }
  },

  {
    name: "Legitimized Bastard",
    description: <<~DESC.strip,
      This character was born a bastard but has been legitimized. \
      Legitimized bastards can inherit, though the stain of bastardy can never be entirely cleansed.
    DESC
    cost: -1,
    effects: {
      diplomacy: -1
    }
  },

  {
    name: "Homosexual",
    description: <<~DESC.strip,
      This character is a bit queer...
    DESC
    cost: 0,
    effects: {
      fertility: -15,
      attraction_opinion: 30,
      vassal_opinion: -5
    }
  },

  {
    name: "Clubfooted",
    description: <<~DESC.strip,
      This character was born with a clubfoot - an unattractive disability.
    DESC
    cost: -4,
    effects: {
      martial: -1,
      personal_combat_skill: -5,
      attraction_opinion: -10,
      same_trait_opinion: 5
    }
  },

  {
    name: "Harelip",
    description: <<~DESC.strip,
      This character was born with a harelip - a less then charming trait.
    DESC
    cost: -4,
    effects: {
      diplomacy: -1,
      attraction_opinion: -10,
      same_trait_opinion: 5
    }
  },

  {
    name: "Hunchback",
    description: <<~DESC.strip,
      This character is cursed with a humpback, which is despised by vassals and ugly is the eyes of the opposite sex.
    DESC
    cost: -19,
    effects: {
      martial: -1,
      attraction_opinion: -30,
      vassal_opinion: -5,
      same_trait_opinion: 5
    }
  },

  {
    name: "Lisp",
    description: <<~DESC.strip,
      The lisp of this character sometimes causes them to mispronounce words.
    DESC
    cost: 2,
    effects: {
      diplomacy: -1,
      same_trait_opinion: 5
    }
  },

  {
    name: "Stutter",
    description: <<~DESC.strip,
      This character is a stutterer. It hampers their ability to communicate effectively with others.
    DESC
    cost: -4,
    effects: {
      diplomacy: -1,
      same_trait_opinion: 5
    }
  },

  {
    name: "Attractive",
    description: <<~DESC.strip,
      This character has a most pleasing physique, most attractive to the opposite sex.
    DESC
    cost: 16,
    effects: {
      diplomacy: 1,
      attraction_opinion: 30
    },
    opposites: [
      "Ugly"
    ]
  },

  {
    name: "Ugly",
    description: <<~DESC.strip,
      This character has a face that brings a tear to the eye...
    DESC
    cost: -11,
    effects: {
      diplomacy: -1,
      attraction_opinion: -20
    },
    opposites: [
      "Attractive"
    ]
  },

  {
    name: "Dwarf",
    description: <<~DESC.strip,
      This unfortunate character was born a dwarf.
    DESC
    cost: -14,
    effects: {
      martial: -1,
      personal_combat_skill: -15,
      attraction_opinion: -30,
      same_trait_opinion: 5
    },
    opposites: [
      "Giant"
    ]
  },

  {
    name: "Genius",
    description: <<~DESC.strip,
      This character is blessed with a towering intellect.
    DESC
    cost: 30,
    effects: {
      martial: 5,
      intrigue: 5,
      diplomacy: 5,
      stewardship: 5,
      learning: 5,
      personal_combat_skill: 10,
      vassal_opinion: 5
    },
    opposites: [
      "Quick",
      "Slow",
      "Imbecile"
    ]
  },

  {
    name: "Quick",
    description: <<~DESC.strip,
      This character is brighter than most.
    DESC
    cost: 15,
    effects: {
      martial: 3,
      intrigue: 3,
      diplomacy: 3,
      stewardship: 3,
      learning: 3,
      personal_combat_skill: 5
    },
    opposites: [
      "Genius",
      "Slow",
      "Imbecile"
    ]
  },

  {
    name: "Slow",
    description: <<~DESC.strip,
      This character is not exactly blessed with a towering intellect
    DESC
    cost: -15,
    effects: {
      martial: -3,
      intrigue: -3,
      diplomacy: -3,
      stewardship: -3,
      learning: -3,
      personal_combat_skill: -5
    },
    opposites: [
      "Genius",
      "Quick",
      "Imbecile"
    ]
  },

  {
    name: "Imbecile",
    description: <<~DESC.strip,
      This character is a drooling imbecile.
    DESC
    cost: -65,
    effects: {
      martial: -8,
      intrigue: -8,
      diplomacy: -8,
      stewardship: -8,
      learning: -8,
      personal_combat_skill: -30,
      attraction_opinion: -30,
      vassal_opinion: -10
    },
    opposites: [
      "Genius",
      "Quick",
      "Imbecile"
    ]
  },

  {
    name: "Inbred",
    description: <<~DESC.strip,
      This poor character suffers from the effects of inbreeding, leading to disfigurement, mental retardation, \
      and probable steriliry.
    DESC
    cost: -71,
    effects: {
      martial: -5,
      intrigue: -5,
      diplomacy: -5,
      stewardship: -5,
      learning: -5,
      fertility: -30,
      health: -1.50,
      personal_combat_skill: -20,
      attraction_opinion: -30,
      vassal_opinion: -10
    }
  },

  {
    name: "Strong",
    description: <<~DESC.strip,
      This character is blessed with a powerful physique.
    DESC
    cost: 25,
    effects: {
      martial: 2,
      diplomacy: 1,
      fertility: 10,
      health: 1.00,
      personal_combat_skill: 10,
      attraction_opinion: 10,
      vassal_opinion: 5,
      tribal_opinion: 10
    },
    opposites: [
      "Weak"
    ]
  },

  {
    name: "Weak",
    description: <<~DESC.strip,
      This character had been cursed with a weak physique.
    DESC
    cost: -22,
    effects: {
      martial: -1,
      fertility: -5,
      health: -1.00,
      personal_combat_skill: -10,
      attraction_opinion: -10,
      vassal_opinion: -5,
      tribal_opinion: -10
    },
    opposites: [
      "Strong"
    ]
  },

  {
    name: "Celibate",
    description: <<~DESC.strip,
      This character has chosen a life of celibacy.
    DESC
    cost: -28,
    effects: {
      monthly_piety: 1.00,
      fertility: -1000,
      christian_church_opinion: 5,
      same_trait_opinion: 10,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Hedonist",
      "Master Seducer"
    ]
  },

  {
    name: "Hedonist",
    description: <<~DESC.strip,
      This character has chosen to lead a life of debauchery and sin. The Church is unlikely to approve...
    DESC
    cost: 10,
    effects: {
      intrigue: 1,
      diplomacy: 2,
      fertility: 20,
      christian_church_opinion: -5,
      same_trait_opinion: 10,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Celibate"
    ]
  },

  {
    name: "Scholar",
    description: <<~DESC.strip,
      This character leads the life of a scholar, poring over books and corresponding with the finest minds in the known world.
    DESC
    cost: 10,
    effects: {
      learning: 3,
      same_trait_opinion: 10
    }
  },

  {
    name: "Gardener",
    description: <<~DESC.strip,
      This character likes nothing better than to putter away in the garden, growing herbs and exotic fruit trees.
    DESC
    cost: 10,
    effects: {
      stewardship: 2,
      learning: 1,
      same_trait_opinion: 10
    }
  },

  {
    name: "Mystic",
    description: <<~DESC.strip,
      This character has delved into the mysteries of the occult, treading a fine line between heresy and orthodox approval.
    DESC
    cost: 10,
    effects: {
      stewardship: 1,
      learning: 2,
      same_trait_opinion: 10
    }
  },

  {
    name: "Impaler",
    description: <<~DESC.strip,
      This depraved character likes ot spend the nights in the dungeon, inventing new ways of torturing unfortunate victims.
    DESC
    cost: 10,
    effects: {
      morale_damage: 10,
      intrigue: 2,
      learning: 1,
      personal_combat_skill: 10,
      same_trait_opinion: 10
    }
  },

  {
    name: "Duelist",
    description: <<~DESC.strip,
      This character is a masterful fencer and duelist - a dangerous lifestyle to be sure.
    DESC
    cost: 10,
    effects: {
      martial: 3,
      personal_combat_skill: 30,
      same_trait_opinion: 10
    }
  },

  {
    name: "Hunter",
    description: <<~DESC.strip,
      This character only feels truly alive when killing God's little creatures.
    DESC
    cost: 10,
    effects: {
      pursuit: 20,
      martial: 2,
      diplomacy: 1,
      personal_combat_skill: 10,
      same_trait_opinion: 10
    }
  },

  {
    name: "Poet",
    description: <<~DESC.strip,
      This character likes to write and declaim poetry.
    DESC
    cost: 4,
    effects: {
      diplomacy: 1,
      same_trait_opinion: 10
    }
  },

  {
    name: "Falconer",
    description: <<~DESC.strip,
      This character is an avid falconer - a well respected pastime.
    DESC
    cost: 4,
    effects: {
      diplomacy: 1,
      same_trait_opinion: 10
    }
  },

  {
    name: "Lustful",
    description: <<~DESC.strip,
      Lust, or 'Luxuria', the first deadly sin, enflames this character. \
      These carnal desires are not appreciated by the Church, and might also cause problems out of the marital bed...
    DESC
    cost: 0,
    effects: {
      monthly_piety: -0.25,
      intrigue: 1,
      fertility: 20,
      christian_church_opinion: -5
    },
    opposites: [
      "Chaste"
    ]
  },

  {
    name: "Chaste",
    description: <<~DESC.strip,
      Chastity, or 'Castitas' is the first of the seven virtues. \
      Chaste characters are admired for their virtue and are unlikely to have extramarital affairs.
    DESC
    cost: 6,
    effects: {
      monthly_piety: 0.50,
      learning: 1,
      fertility: -15,
      christian_church_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Lustful"
    ]
  },

  {
    name: "Gluttonous",
    description: <<~DESC.strip,
      Gluttony, or 'Gula', is the second deadly sin and lacks positive effects. \
      The Church despises gluttons, and so do members of the opposite sex.
    DESC
    cost: -10,
    effects: {
      stewardship: -2,
      church_opinion: -5,
      attraction_opinion: -15,
      same_trait_opinion: 5
    },
    opposites: [
      "Temperate"
    ]
  },

  {
    name: "Temperate",
    description: <<~DESC.strip,
      This character believes in the virtue of 'Temperantia', moderation - a valuable trait in rulers and Stewards.
    DESC
    cost: 5,
    effects: {
      stewardship: 2,
      church_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Gluttonous"
    ]
  },

  {
    name: "Greedy",
    description: <<~DESC.strip,
      This character is infamously greedy. \
      'Avaritia', the third deadly sin, while not respected, does help squeeze out some extra tax income.
    DESC
    cost: 4,
    effects: {
      national_tax_modifier: 10,
      diplomacy: -1,
    },
    opposites: [
      "Charitable"
    ]
  },

  {
    name: "Charitable",
    description: <<~DESC.strip,
      This character is famously charitable. 'Caritas' is the third of the seven virtues and a most chivalrous trait.
    DESC
    cost: 6,
    effects: {
      diplomacy: 3,
      personal_combat_skill: -3,
      church_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Greedy"
    ]
  },

  {
    name: "Slothful",
    description: <<~DESC.strip,
      This character is shockingly lazy. 'Acedia', the fourth deadly sin, is an altogether negative trait.
    DESC
    cost: -10,
    effects: {
      martial: -1,
      intrigue: -1,
      diplomacy: -1,
      stewardship: -1,
      learning: -1,
      personal_combat_skill: -5,
      vassal_opinion: -5
    },
    opposites: [
      "Diligent"
    ]
  },

  {
    name: "Diligent",
    description: <<~DESC.strip,
      This character is dutiful and diligent, the fourth of the seven virtues - 'Industria'
    DESC
    cost: 10,
    effects: {
      martial: 1,
      intrigue: 1,
      diplomacy: 1,
      stewardship: 1,
      learning: 1,
      vassal_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Slothful"
    ]
  },

  {
    name: "Envious",
    description: <<~DESC.strip,
      This character is envious, the sixth deadly sin - 'Invidia'.
    DESC
    cost: 1,
    effects: {
      intrigue: 2,
      diplomacy: -1,
      personal_combat_skill: 3,
      liege_opinion: -15
    },
    opposites: [
      "Kind"
    ]
  },

  {
    name: "Kind",
    description: <<~DESC.strip,
      This character is kind and full of empathy. \
      The sixth virtue, 'Humanitas', is popular with vassals, but makes for a rather poor Spymaster.
    DESC
    cost: 5,
    effects: {
      intrigue: -2,
      diplomacy: 2,
      personal_combat_skill: -5,
      vassal_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Envious",
      "Cruel"
    ]
  },

  {
    name: "Wroth",
    description: <<~DESC.strip,
      The fifth deadly sin is Wrath, 'Ira', and this character certainly has a hot temper.
    DESC
    cost: 1,
    effects: {
      martial: 3,
      intrigue: -1,
      diplomacy: -1,
      personal_combat_skill: 3
    },
    opposites: [
      "Patient"
    ]
  },

  {
    name: "Patient",
    description: <<~DESC.strip,
      Parience, or 'Patientia', is the fifth of the seven virtues and the opposite of Wrath. \
      Patient characters are just a little bit better at almost everything.
    DESC
    cost: 12,
    effects: {
      defence: 20,
      intrigue: 1,
      diplomacy: 1,
      stewardship: 1,
      learning: 1,
      personal_combat_skill: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Wroth"
    ]
  },

  {
    name: "Proud",
    description: <<~DESC.strip,
      Pride, 'Superbia' is the seventh deadly sin according to the Church. \
      However, proud characters tend to be ambitious and work hard to increase their Prestige.
    DESC
    cost: 5,
    effects: {
      monthly_prestige: 0.50
    },
    opposites: [
      "Humble"
    ]
  },

  {
    name: "Humble",
    description: <<~DESC.strip,
      Humility, or 'Humilitas', is the seventh virtue and the opposite of Pride. \
      Humble characters gain Piety where the proud gain Prestige. Humble characters tend to dislike prideful ones.
    DESC
    cost: 20,
    effects: {
      monthly_piety: 1.00,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Proud"
    ]
  },

  {
    name: "Deceitful",
    description: <<~DESC.strip,
      This character has a manipulative and dishonest nature - an excellent trait for spymasters... as long as they remain loyal.
    DESC
    cost: -2,
    effects: {
      intrigue: 3,
      diplomacy: -2,
      personal_combat_skill: 3,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Honest"
    ]
  },

  {
    name: "Honest",
    description: <<~DESC.strip,
      Lies do not come easily to this character, who values truth above all else. \
      It is not a good trait for spymasters and plotters, but is respected  among diplomats.
    DESC
    cost: 1,
    effects: {
      intrigue: -2,
      diplomacy: 3,
      personal_combat_skill: -2,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Deceitful"
    ]
  },

  {
    name: "Craven",
    description: <<~DESC.strip,
      This character is a craven and a coward.
    DESC
    cost: -17,
    effects: {
      morale_defence: -20,
      martial: -2,
      personal_combat_skill: -10,
      vassal_opinion: -5
    },
    opposites: [
      "Brave"
    ]
  },

  {
    name: "Brave",
    description: <<~DESC.strip,
      This character never shies from personal danger, enjoying the respect of vassals but the envy of cravens.
    DESC
    cost: 12,
    effects: {
      morale_defence: 10,
      martial: 2,
      personal_combat_skill: 10,
      vassal_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Craven"
    ]
  },

  {
    name: "Shy",
    description: <<~DESC.strip,
      This character is shy and reclusive, suffering a penalty to diplomacy.
    DESC
    cost: -2,
    effects: {
      diplomacy: -2,
      personal_combat_skill: -2
    },
    opposites: [
      "Gregarious"
    ]
  },

  {
    name: "Gregarious",
    description: <<~DESC.strip,
      This character is gregarious and socially competent.
    DESC
    cost: 12,
    effects: {
      diplomacy: 2,
      attraction_opinion: 5,
      vassal_opinion: 5,
      same_trait_opinion: 5
    },
    opposites: [
      "Shy"
    ]
  },

  {
    name: "Ambitious",
    description: <<~DESC.strip,
      Ambitious characters work harder, making them better at everything. \
      However, their drive to reach the top means that they tend to make poor vassals...
    DESC
    cost: 8,
    effects: {
      martial: 2,
      intrigue: 2,
      diplomacy: 2,
      stewardship: 2,
      learning: 2,
      personal_combat_skill: 3,
      same_trait_opinion: -5,
      ambition_opinion: -25
    },
    opposites: [
      "Content"
    ]
  },

  {
    name: "Content",
    description: <<~DESC.strip,
      Content characters are satisfied with their lot in life. \
      They make loyal vassals but are unsuited to intrigue.
    DESC
    cost: 9,
    effects: {
      monthly_piety: 0.50,
      intrigue: -1,
      liege_opinion: 25
    },
    opposites: [
      "Ambitious"
    ]
  },

  {
    name: "Arbitrary",
    description: <<~DESC.strip,
      This character could not care less about justice - a character flaw that is not appreciated by vassals and courtiers.
    DESC
    cost: -7,
    effects: {
      intrigue: 1,
      stewardship: -2,
      learning: -1,
      vassal_opinion: -5
    },
    opposites: [
      "Just"
    ]
  },

  {
    name: "Just",
    description: <<~DESC.strip,
      The character has a well developed sense of justice - a trait much respected by vassals and courtiers.
    DESC
    cost: 8,
    effects: {
      stewardship: 2,
      learning: 1,
      vassal_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Arbitrary"
    ]
  },

  {
    name: "Cynical",
    description: <<~DESC.strip,
      This character is a cynical unbeliever, disliked by the clergy but good at intrigue.
    DESC
    cost: -5,
    effects: {
      monthly_piety: -0.20,
      intrigue: 2,
      church_opinion: -5,
      same_trait_opinion: 5,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Zealous"
    ]
  },

  {
    name: "Zealous",
    description: <<~DESC.strip,
      This character burns with religious fervor and cannot tolerate heretics, infidels, or heathens.
    DESC
    cost: 30,
    effects: {
      monthly_piety: 1.00,
      martial: 2,
      church_opinion: 5,
      other_faith_opinion: -25,
      opposite_trait_opinion: -5,
      religious_same_trait_opinion: 15
    },
    opposites: [
      "Cynical"
    ]
  },

  {
    name: "Paranoid",
    description: <<~DESC.strip,
      This character sees enemies in every shadow, unable to trust anyone.
    DESC
    cost: 1,
    effects: {
      intrigue: 2,
      diplomacy: -1
    },
    opposites: [
      "Trusting"
    ]
  },

  {
    name: "Trusting",
    description: <<~DESC.strip,
      Trusting characters make poor spymasters, but good friends.
    DESC
    cost: -1,
    effects: {
      intrigue: -2,
      diplomacy: 1,
      personal_combat_skill: -2
    },
    opposites: [
      "Paranoid"
    ]
  },

  {
    name: "Cruel",
    description: <<~DESC.strip,
      This character is an evil sadist, taking pleasure in the suffering of others.
    DESC
    cost: 0,
    effects: {
      morale_damage: 10,
      intrigue: 1,
      diplomacy: -1,
      personal_combat_skill: 3,
      vassal_opinion: -5
    },
    opposites: [
      "Kind"
    ]
  },

  {
    name: "Scarred",
    description: <<~DESC.strip,
      Old wounds have left this character visibly scarred.
    DESC
    cost: 6,
    effects: {
      monthly_prestige: 0.10,
      opposite_trait_opinion: 10
    },
    opposites: [
      "Grievously Scarred",
      "Horrifically Scarred"
    ]
  },

  {
    name: "Master Seducer",
    description: <<~DESC.strip,
      This man is a notorious rake and debaucher who leaves a trail of broken hearts - and bastards - in his wake.
    DESC
    cost: 12,
    effects: {
      intrigue: 2,
      diplomacy: 1,
      attraction_opinion: 50
    },
    opposites: [
      "Celibate"
    ]
  },

  {
    name: "Administrator",
    description: <<~DESC.strip,
      This character is a devoted administrator who loves order and efficiency above all things.
    DESC
    cost: 10,
    effects: {
      movement_speed: 10,
      stewardship: 3
    }
  },

  {
    name: "Architect",
    description: <<~DESC.strip,
      This character loves buildings, architecture and machinery, particularly anything related to siege warfare.
    DESC
    cost: 10,
    effects: {
      siege: 20,
      martial: 1,
      stewardship: 2,
      great_work_build_cost: -3,
      great_work_build_time: -5,
      same_trait_opinion: 10
    }
  },

  {
    name: "Strategist",
    description: <<~DESC.strip,
      This character loves planning campaigns and analyzing the current state of affairs.
    DESC
    cost: 12,
    effects: {
      defence: 20,
      martial: 2,
      stewardship: 1,
      same_trait_opinion: 10
    }
  },

  {
    name: "Socializer",
    description: <<~DESC.strip,
      This character is committed to being well liked, and spends most spare time in the company of others.
    DESC
    cost: 12,
    effects: {
      diplomacy: 3,
      attraction_opinion: 10,
      same_trait_opinion: 10
    }
  },

  {
    name: "Master Schemer",
    description: <<~DESC.strip,
      This character leads a life of intrigue and manipulation.
    DESC
    cost: 10,
    effects: {
      intrigue: 3,
      same_trait_opinion: -5
    }
  },

  {
    name: "Theologian",
    description: <<~DESC.strip,
      This character is dedicating his life to religious studies.
    DESC
    cost: 10,
    effects: {
      intrigue: 1,
      learning: 2
    }
  },

  {
    name: "Game Master",
    description: <<~DESC.strip,
      This character is renowned as an avid and masterful game player - anything from chess to tabula, to exotic pachisi.
    DESC
    cost: 10,
    effects: {
      narrow_flank: 30,
      martial: 1,
      diplomacy: 2,
      same_trait_opinion: 10
    }
  },

  {
    name: "Erudite",
    description: <<~DESC.strip,
      This character has a scholarly and bookish disposition.
    DESC
    cost: 5,
    effects: {
      learning: 2,
      personal_combat_skill: -2,
      church_opinion: 5
    }
  },

  {
    name: "Stubborn",
    description: <<~DESC.strip,
      This character is stubborn as a mule.
    DESC
    cost: -5,
    effects: {
      diplomacy: -1,
      stewardship: 1,
      personal_combat_skill: 3,
      vassal_opinion: -5
    }
  },

  {
    name: "Brawny",
    description: <<~DESC.strip,
      This character is physically brawny.
    DESC
    cost: 21,
    effects: {
      martial: 2,
      diplomacy: 1,
      health: 1.00,
      personal_combat_skill: 10,
      attraction_opinion: 5,
      vassal_opinion: 5,
      tribal_opinion: 5
    },
    opposites: [
      "Frail",
      "Sturdy"
    ]
  },

  {
    name: "Frail",
    description: <<~DESC.strip,
      This character is physically frail.
    DESC
    cost: -14,
    effects: {
      martial: -1,
      health: -0.50,
      personal_combat_skill: -10,
      attraction_opinion: -5,
      vassal_opinion: -5,
      tribal_opinion: -5
    },
    opposites: [
      "Brawny",
      "Sturdy"
    ]
  },

  {
    name: "Shrewd",
    description: <<~DESC.strip,
      This character has developed a sharp and astute mind.
    DESC
    cost: 10,
    effects: {
      martial: 2,
      intrigue: 2,
      diplomacy: 2,
      stewardship: 2,
      learning: 2,
      personal_combat_skill: 3
    },
    opposites: [
      "Dull"
    ]
  },

  {
    name: "Dull",
    description: <<~DESC.strip,
      This character isn't the sharpest knife in the drawer.
    DESC
    cost: -10,
    effects: {
      martial: -2,
      intrigue: -2,
      diplomacy: -2,
      stewardship: -2,
      learning: -2,
      personal_combat_skill: -3
    },
    opposites: [
      "Shrewd"
    ]
  },

  {
    name: "Cannibal",
    description: <<~DESC.strip,
      This character seeks to serve man.
    DESC
    cost: 6,
    effects: {
      martial: 3,
      general_opinion: -10,
      personal_combat_skill: 10,
      same_trait_opinion: 25
    }
  },

  {
    name: "Giant",
    description: <<~DESC.strip,
      This character was born a giant. \
      While imposing, this character suffers from significant health problems and is likely to die young.
    DESC
    cost: -7,
    effects: {
      fertility: -20,
      health: -0.50,
      personal_combat_skill: 10,
      attraction_opinion: -5,
      vassal_opinion: 5,
      tribal_opinion: 10
    },
    opposites: [
      "Dwarf"
    ]
  },

  {
    name: "Left-Handed",
    description: <<~DESC.strip,
      This character is left-handed. \
      While seen with suspicion by the clergy, left-handed people tend to have a sonsiderable advantage in combat.
    DESC
    cost: 0,
    effects: {
      personal_combat_skill: 15,
      christian_church_opinion: -10,
      muslim_opinion: -10,
      same_trait_opinion: 5
    }
  },

  {
    name: "Sturdy",
    description: <<~DESC.strip,
      This character is physically sturdy.
    DESC
    cost: 3,
    effects: {
      health: 0.25,
      personal_combat_skill: 2
    },
    opposites: [
      "Brawny",
      "Frail"
    ]
  },

  {
    name: "Groomed",
    description: <<~DESC.strip,
      This character takes care to always look at their best.
    DESC
    cost: 5,
    effects: {
      attraction_opinion: 15,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Uncouth"
    ]
  },

  {
    name: "Uncouth",
    description: <<~DESC.strip,
      Grooming and personal care are not exactly priorities for this character.
    DESC
    cost: -8,
    effects: {
      attraction_opinion: -10,
      opposite_trait_opinion: -5
    },
    opposites: [
      "Groomed"
    ]
  },

  {
    name: "Grievously Scarred",
    description: <<~DESC.strip,
      Old wounds have left this character visibly scarred.
    DESC
    cost: 9,
    effects: {
      monthly_prestige: 0.15,
      personal_combat_skill: 5,
      attraction_opinion: 5,
      same_trait_opinion: 5,
      opposite_trait_opinion: 5,
      tribal_opinion: 5
    },
    opposites: [
      "Scarred",
      "Horrifically Scarred"
    ]
  },

  {
    name: "Horrifically Scarred",
    description: <<~DESC.strip,
      This character has seen their share of fights, as their face can attest.
    DESC
    cost: 15,
    effects: {
      monthly_prestige: 0.20,
      personal_combat_skill: 10,
      attraction_opinion: 10,
      same_trait_opinion: 10,
      opposite_trait_opinion: 5,
      tribal_opinion: 10
    },
    opposites: [
      "Scarred",
      "Grievously Scarred"
    ]
  },

  {
    name: "Gladiator",
    description: <<~DESC.strip,
      This character trained as a Gladiator in the arena.
    DESC
    cost: 14,
    effects: {
      martial: 5,
      intrigue: 2,
      stewardship: -2,
      learning: -4,
      health: 1.00,
      general_opinion: -5,
      personal_combat_skill: 15,
      same_trait_opinion: 15
    }
  }
]

educations = [
  {
    name: "Amateurish Plotter",
    description: <<~DESC.strip,
      The Amateurish Plotter has received an education emphasizing intrigue skills. Unfortunately, it didn't stick.
    DESC
    cost: 0,
    effects: {
      intrigue: 1,
      stewardship: -1,
      personal_combat_skill: 4
    }
  },

  {
    name: "Flamboyant Schemer",
    description: <<~DESC.strip,
      Flamboyant Schemers thrive on court intrigue and fancy themselves masters of the trade. \
      However, their lack of secrecy tends to endanger even their best efforts.
    DESC
    cost: 2,
    effects: {
      intrigue: 3,
      stewardship: -1,
      personal_combat_skill: 8
    }
  },

  {
    name: "Intricate Webweaver",
    description: <<~DESC.strip,
      The Intricate Webweaver is a master manipulator, well suited to a life of intrigue.
    DESC
    cost: 7,
    effects: {
      martial: 1,
      intrigue: 6,
      diplomacy: 1,
      stewardship: -1,
      personal_combat_skill: 12
    }
  },

  {
    name: "Elusive Shadow",
    description: <<~DESC.strip,
      The Elusive Shadow has mastered the art of Intrigue \
      and should make a perfect Spymaster - as well as an idea mentor for prospective schemers.
    DESC
    cost: 12,
    effects: {
      martial: 2,
      intrigue: 9,
      diplomacy: 2,
      stewardship: -1,
      personal_combat_skill: 16
    }
  },

  {
    name: "Naive Appeaser",
    description: <<~DESC.strip,
      Naive Appeasers want to be well liked and fancy themselves diplomates. \
      Unfortunately, everyone else just tends to bully them.
    DESC
    cost: 0,
    effects: {
      martial: -1,
      diplomacy: 1
    }
  },

  {
    name: "Underhanded Rogue",
    description: <<~DESC.strip,
      The Underhanded Rogue is a rough but decently effective diplomat.
    DESC
    cost: 3,
    effects: {
      martial: -1,
      diplomacy: 3,
      fertility: 5
    }
  },

  {
    name: "Charismatic Negotiator",
    description: <<~DESC.strip,
      The Charismatic Negotiator is an excellent diplomat, impressing dignitaries with elegant dress and persuasive rhetoric.
    DESC
    cost: 8,
    effects: {
      martial: -1,
      intrigue: 1,
      diplomacy: 6,
      learning: 1,
      fertility: 5
    }
  },

  {
    name: "Grey Eminence",
    description: <<~DESC.strip,
      The Grey Eminence is the epitome of statesmenship having fully mastered the art of diplomacy.
    DESC
    cost: 14,
    effects: {
      martial: -1,
      intrigue: 2,
      diplomacy: 9,
      learning: 2,
      fertility: 10
    }
  },

  {
    name: "Indulgent Wastrel",
    description: <<~DESC.strip,
      The Indulgent Wastrel was groomed to become good with money, \
      and if good means spending it quickly, the Indulgent Wastrel certainly is.
    DESC
    cost: 0,
    effects: {
      diplomacy: -1,
      stewardship: 1
    }
  },

  {
    name: "Thrifty Clerk",
    description: <<~DESC.strip,
      The Thrifty Clerk is a dutiful, if not particularly skilled, administrator.
    DESC
    cost: 3,
    effects: {
      diplomacy: -1,
      stewardship: 3,
      fertility: 5
    }
  },

  {
    name: "Fortune Builder",
    description: <<~DESC.strip,
      The Fortune Builder came out of adolescence armed with a well honed business sense, determined to live a life of luxury.
    DESC
    cost: 9,
    effects: {
      martial: 1,
      diplomacy: -1,
      stewardship: 6,
      learning: 1,
      fertility: 10
    }
  },

  {
    name: "Midas Touched",
    description: <<~DESC.strip,
      This character is truly Midas Touched, never seeming to run out of funds \
      - an excellent choice for Steward and mentor to children destined to become administrators.
    DESC
    cost: 15,
    effects: {
      martial: 2,
      diplomacy: -1,
      stewardship: 9,
      learning: 2,
      fertility: 15
    }
  },

  {
    name: "Misguided Warrior",
    description: <<~DESC.strip,
      The Misguided Warrior was trained in warfare and the martial arts, but sadly lacks all talent for it.
    DESC
    cost: 5,
    effects: {
      martial: 1,
      learning: -1,
      health: 0.50,
      personal_combat_skill: 5
    }
  },

  {
    name: "Tough Soldier",
    description: <<~DESC.strip,
      The Tough Soldier is fearsome on the battlefield, but only a mediocre commander.
    DESC
    cost: 7,
    effects: {
      martial: 3,
      learning: -1,
      health: 0.50,
      personal_combat_skill: 10
    }
  },

  {
    name: "Skilled Tactician",
    description: <<~DESC.strip,
      The Skilled Tactician is an adept in the art of war - a valiant warrior and reliable commander.
    DESC
    cost: 12,
    effects: {
      martial: 6,
      intrigue: 1,
      stewardship: 1,
      learning: -1,
      health: 0.50,
      personal_combat_skill: 15
    }
  },

  {
    name: "Brilliant Strategist",
    description: <<~DESC.strip,
      The Brilliant Strategist has an almost preternatural understanding of all things martial, \
      hacing the perfect makings for a Marshal or a military tutor.
    DESC
    cost: 17,
    effects: {
      martial: 9,
      intrigue: 2,
      stewardship: 2,
      learning: -1,
      health: 0.50,
      personal_combat_skill: 20
    }
  },

  {
    name: "Detached Priest",
    description: <<~DESC.strip,
      The Detached Priest received a clerical education but displays no talent beyond basic literacy.
    DESC
    cost: 0,
    effects: {
      intrigue: -1,
      learning: 1
    }
  },

  {
    name: "Dutiful Cleric",
    description: <<~DESC.strip,
      The Dutiful Cleric is learned and possessed of beautiful penmanship, but lacks particular interest in theology.
    DESC
    cost: 2,
    effects: {
      intrigue: -1,
      learning: 3
    }
  },

  {
    name: "Scholarly Theologian",
    description: <<~DESC.strip,
      The Scholarly Theologian is wise and well read, with a deep understanding of philosophy and theology.
    DESC
    cost: 6,
    effects: {
      intrigue: -1,
      diplomacy: 1,
      stewardship: 1,
      learning: 6,
      fertility: -5
    }
  },

  {
    name: "Mastermind Theologian",
    description: <<~DESC.strip,
      The Mastermind Theologian is recognized as one of the top scholars of the Faith.
    DESC
    cost: 11,
    effects: {
      intrigue: -1,
      diplomacy: 2,
      stewardship: 2,
      learning: 9,
      fertility: -5
    }
  }
]

educations.each { |education| education[:type] = "Education" }

Trait.create(educations)
Trait.create(traits)

Trait.all.each do |trait|
  trait.opposites = trait.opposites.map do |opposite|
    Trait.find_by(name: opposite).id
  end
  trait.save
end