class CulturesController < ApplicationController

  def index
    render json: Culture.all.to_json
  end

end