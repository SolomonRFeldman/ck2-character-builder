class CharactersController < ApplicationController

  def create
    character = Character.find_by(id: params[:character][:id])
    character ? character.update(user_params) : character = Character.new(user_params)
    character.save
    render json: CharacterSerializer.new(character).to_serialized_json
  end

  private

  def user_params
    params.require(:character).permit(:name, :dynasty, :marriage_status, :culture, :religion, :sex)
  end
  
end