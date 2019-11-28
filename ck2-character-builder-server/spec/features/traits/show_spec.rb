require 'rails_helper'

describe 'Trait Features', :type => :feature do

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

  let(:valid_trait_2) do
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
    }
  end

  before do
    Trait.create(valid_trait)
    Trait.create(valid_trait_2)
  end

  context "when a get request is sent to /traits" do
    before do
      page.driver.submit :get, traits_path, {}
    end

    it "serializes all the traits" do
      expect(page).to have_content(Trait.all.to_json)
    end
  end

end