require 'rails_helper'

RSpec.describe Education, :type => :model do

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

  let(:primary_character) do
    Character.create({
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male"
    })
  end

  let(:secondary_character) do
    Character.create({
      name: "William",
      dynasty: "de Normandy",
      marriage_status: true,
      culture: "Norman",
      religion: "Catholic",
      sex: "Male"
    })
  end

  it "is valid with a name, description, cost, group, and effects" do
    expect(valid_education).to be_valid
  end

  context "when multiple characters have this education" do
    before do
      valid_education.characters = [primary_character, secondary_character]
      valid_education.save
    end

    it "has many characters" do
      expect(valid_education.characters).to include(primary_character)
      expect(valid_education.characters).to include(secondary_character)
    end
  end

end