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

  it "is valid with all stats set to base level" do
    expect(CharacterAttribute.create(valid_character_attribute)).to be_valid
  end

end