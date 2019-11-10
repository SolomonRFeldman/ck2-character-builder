require 'rails_helper'

describe 'Religion Features', :type => :feature do

  context "when a get request is sent to /religions" do
    before do
      page.driver.submit :get, religions_path, {}
    end

    it "jsonifies all the religions" do
      expect(page).to have_content(Religion.all.to_json)
    end
  end

end