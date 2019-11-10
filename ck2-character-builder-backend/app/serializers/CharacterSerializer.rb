class CharacterSerializer
  
  def initialize(character)
    @character = character
  end

  def to_serialized_json
    options = {
      include: :character_attribute
      }
    @character.to_json(options)
  end

end