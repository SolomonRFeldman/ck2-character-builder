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

  context "when a post request for a already saved character is sent" do
    before do
      page.driver.submit :post, characters_path, character: valid_character
      page.driver.submit :post, characters_path, character: valid_character.merge({ 
        id: Character.all.last.id,
        religion: "Catholic",
        character_attribute: valid_character_attribute.merge({ diplomacy: 10 })
      })
    end

    it "patches the character's direct info" do
      expect(Character.all.last.religion).to eq("Catholic")
    end

    it "patches the character's attributes" do
      expect(Character.all.last.character_attribute.diplomacy).to eq(10)
    end
  end

end