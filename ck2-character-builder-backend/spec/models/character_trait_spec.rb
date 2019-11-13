require 'rails_helper'

RSpec.describe CharacterTrait, :type => :model do
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

  context "when a valid character and trait exist and their ids are assigned" do
    before do
      char = Character.create(valid_character.merge(character_attribute: CharacterAttribute.create(valid_character_attribute)))
      trait = Trait.create(valid_trait)
      CharacterTrait.create(character_id: char.id, trait_id: trait.id)
    end

    it "belongs to a character and a trait" do
      expect(CharacterTrait.all.last.trait).to eq(Trait.all.last)
      expect(CharacterTrait.all.last.character).to eq(Character.all.last)
    end
  end

end