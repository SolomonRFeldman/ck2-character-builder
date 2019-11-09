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

  it "is valid with a name, dynasty, marriage_status, religion, culture, and sex" do
    expect(Character.create(valid_character)).to be_valid
  end

  context "when a valid character has been created" do
    before do
      Character.create(valid_character)
    end

    it "can be serialized" do
      expect(CharacterSerializer.new(Character.all.last).to_serialized_json).to eq(Character.all.last.to_json)
    end
  end

  context "when a character has an attribute set's char id set to it" do
    before do
      char = Character.create(valid_character)
      char.character_attribute = CharacterAttribute.create(valid_character_attribute)
    end

    it "has one attribute set" do
      expect(Character.all.last.character_attribute).to eq(CharacterAttribute.all.last)
    end
  end
end