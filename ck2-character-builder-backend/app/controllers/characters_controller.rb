class CharactersController < ApplicationController

  def create
    character = Character.find_or_create_with_attributes(character_params)
    render json: CharacterSerializer.new(character).to_serialized_json if character.save
  end

  private

  def character_attribute_params
    { character_attribute: [:diplomacy, :martial, :stewardship, :intrigue, :learning, :health, :fertility, :sons, :daughters] }
  end

  def character_params
    params.require(:character).permit(
      :id,
      :name,
      :dynasty,
      :marriage_status,
      :culture,
      :religion,
      :sex,
      character_attribute_params
    ).tap do |character_params|
      character_params.require(:character_attribute)
    end
  end
  
end