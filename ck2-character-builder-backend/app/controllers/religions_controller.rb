class ReligionsController < ApplicationController

  def index
    render json: Religion.all.to_json
  end

end
