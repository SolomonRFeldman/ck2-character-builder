class TraitsController < ApplicationController

  def index
    render json: Trait.order(:id).to_json
  end

end
