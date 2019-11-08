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

  context "when a post request for a new character is sent" do
    before do
      page.driver.submit :post, characters_path, character: valid_character
    end

    it "creates the character" do
      expect(Character.all.last).to_not be_nil
    end
  end


end