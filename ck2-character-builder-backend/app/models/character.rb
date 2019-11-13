class Character < ApplicationRecord
  has_one :character_attribute
  has_many :character_traits
  has_many :traits, through: :character_traits

  before_update do
    self.character_attribute.save if self.character_attribute
  end

  class << self
    def find_or_create_with_attributes(character_params)
      character = find_by(id: character_params[:id])
      if character
        character.character_attribute.assign_attributes(character_params[:character_attribute])
        character.assign_attributes(character_params.except(:id, :character_attribute))
        character
      else
        Character.new(character_params.except(:id).merge(character_attribute: CharacterAttribute.new(character_params[:character_attribute])))
      end
    end
  end

end