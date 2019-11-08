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

  context "when a post request for a already saved character is sent" do
    before do
      Character.create(valid_character)
      page.driver.submit :post, characters_path, character: valid_character.merge({ id: Character.all.last.id, religion: "Catholic" })
    end

    it "patches the character" do
      expect(Character.all.last.religion).to eq("Catholic")
    end

    it "returns the character jsonified" do
      expect(page).to have_content(CharacterSerializer.new(Character.all.last).to_serialized_json)
    end
  end

end