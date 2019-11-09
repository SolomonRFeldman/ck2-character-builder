require 'rails_helper'

describe 'Character Features', :type => :feature do
  let(:valid_character) do
    {
      id: nil,
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male"
    }
  end

  let(:valid_character_attribute) do

  end

  context "when a post request for a new character is sent with an attribute set" do
    before do
      page.driver.submit :post, characters_path, character: valid_character.merge({ character_attribute: valid_character_attribute })
    end

    it "creates the character" do
      expect(Character.all.last).to_not be_nil
    end

    it "returns the character jsonified" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end
  end


end