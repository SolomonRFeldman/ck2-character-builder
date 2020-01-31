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

  context "when a post request for a new character is sent" do
    before do
      character_traits = { education_id: valid_education.id, trait_ids: [valid_trait.id, secondary_trait.id] }
      page.driver.submit :post, characters_path, character: valid_character.merge(character_traits)
    end

    it "creates the character" do
      expect(Character.all.last).to_not be_nil
    end

    it "returns the character jsonified" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end

    it "creates a character with an attribute set" do
      expect(Character.all.last.character_attribute).to_not be_nil
      expect(Character.all.last.character_attribute).to eq(CharacterAttribute.all.last)
    end

    it "creates a character with an education" do
      expect(Character.all.last.education).to eq(valid_education)
    end

    it "creates a character with traits" do
      expect(Character.all.last.traits).to include(valid_trait)
      expect(Character.all.last.traits).to include(secondary_trait)
    end
  end

  context "when a post request for an invalid new character is sent" do
    before do
      character_traits = { education_id: valid_education.id, trait_ids: [valid_trait.id, secondary_trait.id] }
      page.driver.submit :post, characters_path, character: valid_character.merge(character_traits).merge(name: "")
    end

    it "returns a 200 status" do
      expect(page.status_code).to be(200)
    end
    
    it "returns the error" do
      expect(page).to have_content("\"name\":[\"can't be blank\"]")
    end
  end


end