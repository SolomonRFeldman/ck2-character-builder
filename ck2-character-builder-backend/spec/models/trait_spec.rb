require 'rails_helper'

RSpec.describe Character, :type => :model do
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

  it "is valid with a name, description, cost, group, and effects" do
    expect(Trait.create(valid_trait)).to be_valid
  end

end