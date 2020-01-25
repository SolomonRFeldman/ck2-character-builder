require 'rails_helper'

describe 'Trait Features', :type => :feature do

  let(:primary_education) do
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

  let(:primary_trait) do 
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
    })
  end

  context "when a get request is sent to /traits" do
    before do
      primary_education
      primary_trait
      secondary_trait
      page.driver.submit :get, traits_path, {}
    end

    it "serializes all the traits and separates educational and default" do
      expect(page).to have_content('"default":'"#{Trait.all.where(type: nil).to_json}"'')
      expect(page).to have_content('"education":'"#{Education.all.to_json}"'')
    end
  end

end