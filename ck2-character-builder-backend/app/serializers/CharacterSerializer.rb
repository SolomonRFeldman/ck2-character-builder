class CharacterSerializer
  
  def initialize(character)
    @character = character
  end

  def to_serialized_json
    @character.to_json()
  end

end