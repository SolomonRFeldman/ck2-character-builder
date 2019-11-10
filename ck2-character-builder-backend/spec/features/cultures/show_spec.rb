require 'rails_helper'

describe 'Culture Features', :type => :feature do

  context "when a get request is sent to /cultures" do
    before do
      page.driver.submit :get, cultures_path, {}
    end

    it "jsonifies all the cultures" do
      expect(page).to have_content(Culture.all.to_json)
    end
  end

end