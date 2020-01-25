class CharacterTrait < ApplicationRecord
  belongs_to :character
  belongs_to :trait

  validate :trait_is_not_education
  validate :disallow_opposites_to_join
  validates :character, uniqueness: { scope: :trait }

  def trait_is_not_education
    errors.add(:trait, 'cannot be an education') if trait.type == 'Education'
  end


  def disallow_opposites_to_join
    if trait.opposites.any? { |opposite_id|
        character.trait_ids.any? { |trait_id| trait_id == opposite_id }
      }
      self.errors.add(:trait, 'conflicting traits')
    end
  end

end