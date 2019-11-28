class CharactersController < ApplicationController

  def index
    render json: CharacterSerializer.new(Character.preload(:character_attribute, :education, :traits).all).to_serialized_json
  end

  def show
    render json: CharacterSerializer.new(Character.find_by(id: params[:id])).to_serialized_json
  end

  def create
    character = Character.find_or_create_with_attributes(character_params)
    if character.save
      character.trait_ids = params[:character_trait_ids]
      render json: CharacterSerializer.new(character).to_serialized_json, status: 200
    else
      return render json: { errors: { character: character.errors } }.to_json, status: 400
    end
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
      :education_id,
      character_attribute_params
    ).tap do |character_params|
      character_params.require(:character_attribute)
    end
  end
  
end