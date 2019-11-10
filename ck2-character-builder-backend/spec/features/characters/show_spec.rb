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

  before do
    page.driver.submit :post, characters_path, character: valid_character
  end

  context "when a get request is sent to /characters" do
    before do
      page.driver.submit :get, characters_path, {}
    end

    it "serializes all the characters" do
      expect(page).to have_content(CharacterSerializer.new(Character.all).to_serialized_json)
    end
  end

  context "when a get request is sent to /characters/:id" do
    before do
      page.driver.submit :get, character_path(Character.all.last.id), {}
    end

    it "serializes the character" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end
  end

end 