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
      sex: "Male",
      character_attribute: {
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
    }
  end

  context "when a post request for a new character is sent with an attribute set" do
    before do
      page.driver.submit :post, characters_path, character: valid_character
    end

    it "creates the character" do
      expect(Character.all.last).to_not be_nil
    end

    it "returns the character jsonified" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end

    it "creates a character with an attribute set" do
      expect(Character.all.last.character_attribute).to_not be_nil
      expect(Character.all.last.character_attribute).to eq(CharacterAttribute.all.last)
    end
  end


end