require 'rails_helper'

RSpec.describe CharacterAttribute, :type => :model do
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

  it "is valid with all stats set to base level" do
    expect(CharacterAttribute.create(valid_character_attribute)).to be_valid
  end

  context "when it has a character id set" do
    before do
      char_attr = CharacterAttribute.create(valid_character_attribute)
      char_attr.character = Character.create(valid_character)
      char_attr.save
    end

    it "belongs to a character" do
      expect(CharacterAttribute.all.last.character).to eq(Character.all.last)
    end
  end
end