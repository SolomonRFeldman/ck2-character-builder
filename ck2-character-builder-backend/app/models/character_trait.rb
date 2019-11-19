class CharacterTrait < ApplicationRecord
  belongs_to :character
  belongs_to :trait

  validate :disallow_opposites_to_join



  def disallow_opposites_to_join
    if trait.opposites.any? { |opposite_id|
        character.trait_ids.any? { |trait_id| trait_id = opposite_id }
      }
      self.errors.add(:trait, 'conflicting traits')
    end
  end

end