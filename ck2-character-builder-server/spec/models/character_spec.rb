require 'rails_helper'

RSpec.describe Character, :type => :model do
  let(:valid_character) do
    {
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male"
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

  let(:valid_trait) do
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
      }
    }
  end

  it "is valid with a name, dynasty, marriage_status, religion, culture, and sex" do
    expect(Character.create(valid_character)).to be_valid
  end

  context "when a valid character has been created" do
    before do
      character = Character.create(valid_character)
      character.character_attribute = CharacterAttribute.create(valid_character_attribute)
      character.traits = [Trait.create(valid_trait)]
    end

    it "can be serialized" do
      expect(CharacterSerializer.new(Character.all.last).to_serialized_json).to include('"name":"Ragnarr","dynasty":"Loðbrók"')
    end

    it "can serialize it's attributes" do
      expect(CharacterSerializer.new(Character.all.last).to_serialized_json).to include(CharacterAttribute.all.last.to_json(except: [:id, :character_id]))
    end

    it "has one attribute set" do
      expect(Character.all.last.character_attribute).to eq(CharacterAttribute.all.last)
    end

    it "can serialize its traits" do
      expect(CharacterSerializer.new(Character.all.last).to_serialized_json).to include(Trait.all.first.to_json)
    end

  end
end