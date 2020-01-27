class Character < ApplicationRecord
  has_one :character_attribute, dependent: :destroy
  has_many :character_traits
  has_many :traits, through: :character_traits, dependent: :destroy
  belongs_to :education, optional: :true

  validates :name, presence: :true
  validates :dynasty, presence: :true
  validates :name, uniqueness: { scope: :dynasty, message: "name must be unique within a dynasty" }

  validates :religion, inclusion: { in: Religion.all.values.flatten }
  validates :culture, inclusion: { in: Culture.all.values.flatten }

  validate :education_is_trait_type_education

  before_update do
    self.character_attribute.save if self.character_attribute
  end

  def education_is_trait_type_education
    education = Trait.find_by(id: education_id)
    errors.add(:education, 'must be type Education') if education && education.type != 'Education'
  end

  class << self
    def find_or_create_with_attributes(character_params)
      character = find_by(id: character_params[:id])
      if character
        if character_params[:character_attribute]
          character.character_attribute ? 
          character.character_attribute.assign_attributes(character_params[:character_attribute]) :
          character.character_attribute = CharacterAttribute.new(character_params[:character_attribute])
        end
        character.assign_attributes(character_params.except(:id, :character_attribute))
        character
      else
        Character.new(character_params.except(:id).merge(
          character_attribute: (CharacterAttribute.new(character_params[:character_attribute]) if character_params[:character_attribute])
        ))
      end
    end
  end

end