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

end