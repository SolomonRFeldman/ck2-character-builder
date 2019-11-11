require 'rails_helper'

RSpec.describe Character, :type => :model do
  let(:valid_trait) do 
    {
      name: "Kind",
      description: <<~DESC.strip,
        This character is kind and full of empathy. \
        The sixth virtue, 'Humanitas', is popular with vassals, but makes for a rather poor Spymaster.
      DESC
      cost: 5,
      group: "moral_6"
    }
  end

  it "is valid with a name, description, cost, and group" do
    expect(Trait.create(valid_trait)).to be_valid
  end

end