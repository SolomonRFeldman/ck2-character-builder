class TraitsController < ApplicationController

  def index
    render json: Trait.all.to_json
  end

end
