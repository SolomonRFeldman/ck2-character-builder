class CharacterAttribute < ApplicationRecord
  belongs_to :character, optional: :true

end