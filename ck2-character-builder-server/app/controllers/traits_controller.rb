class TraitsController < ApplicationController

  def index
    render json: { default: Trait.order(:id).where(type: nil), education: Trait.order(:id).where(type: "Education") }.to_json
  end

end
