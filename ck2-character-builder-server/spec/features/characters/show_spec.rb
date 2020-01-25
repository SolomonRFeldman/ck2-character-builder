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

  before do
    character_traits = { education_id: valid_education.id, trait_ids: [valid_trait.id, secondary_trait.id] }
    page.driver.submit :post, characters_path, character: valid_character.merge(character_traits)
  end

  context "when a get request is sent to /characters" do
    before do
      page.driver.submit :get, characters_path, {}
    end

    it "serializes all the characters" do
      expect(page).to have_content(CharacterSerializer.new(Character.all).to_serialized_json)
    end
  end

  context "when a get request is sent to /characters/:id" do
    before do
      page.driver.submit :get, character_path(Character.all.last.id), {}
    end

    it "serializes the character" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end
  end

end 