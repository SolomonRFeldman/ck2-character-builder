require 'rails_helper'

describe 'Character Features', :type => :feature do
  let(:valid_character) do
    {
      id: nil,
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male",
      character_attribute: {
        diplomacy: 5,
        martial: 5,
        stewardship: 5,
        intrigue: 5,
        learning: 5,
        health: 5,
        fertility: 50,
        sons: 0,
        daughters: 0
      }
    }
  end

  let(:valid_character_attribute) do
    {
      diplomacy: 5,
      martial: 5,
      stewardship: 5,
      intrigue: 5,
      learning: 5,
      health: 5,
      fertility: 50,
      sons: 0,
      daughters: 0
    }
  end

  let(:valid_education) do
    Education.create({
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
    })
  end

  let(:secondary_education) do
    Education.create({
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
    })
  end

  let(:valid_trait) do
    Trait.create({
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
      }
    })
  end

  let(:secondary_trait) do
    Trait.create({
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
    })
  end

  let(:tertiary_trait) do
    Trait.create({
      name: "Sturdy",
      description: <<~DESC.strip,
        This character is physically sturdy.
      DESC
      cost: 3,
      effects: {
        health: 0.25,
        personal_combat_skill: 2
      }
    })
  end

  context "when a post request for a already saved character is sent" do
    before do
      character_traits = { education_id: valid_education.id, trait_ids: [valid_trait.id, secondary_trait.id] }
      page.driver.submit :post, characters_path, character: valid_character.merge(character_traits)
      page.driver.submit :post, characters_path, character: valid_character.merge({ 
        id: Character.all.last.id,
        religion: "Catholic",
        character_attribute: valid_character_attribute.merge({ diplomacy: 10 }),
        education_id: secondary_education.id,
        trait_ids: [valid_trait.id, tertiary_trait.id]
      })
    end

    it "patches the character's direct info" do
      expect(Character.all.last.religion).to eq("Catholic")
    end

    it "patches the character's attributes" do
      expect(Character.all.last.character_attribute.diplomacy).to eq(10)
    end

    it "patches the character's traits" do
      expect(Character.all.last.traits).to include(valid_trait)
      expect(Character.all.last.traits).to_not include(secondary_trait)
      expect(Character.all.last.traits).to include(tertiary_trait)
    end

    it "patches the character's education" do
      expect(Character.all.last.education).to eq(secondary_education)
    end

    it "does not create a new character" do
      expect(Character.all.size).to eq(1)
    end
  end

end