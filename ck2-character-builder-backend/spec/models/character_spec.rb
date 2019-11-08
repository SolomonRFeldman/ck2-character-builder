require 'rails_helper'

RSpec.describe Character, :type => :model do
  let(:valid_character) do
    {
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      religion: "Germanic",
      culture: "Norse",
      sex: "Male"
    }
  end

  it "is valid with a name, dynasty, marriage_status, religion, culture, and sex" do
    expect(Character.create(valid_character)).to be_valid
  end

end