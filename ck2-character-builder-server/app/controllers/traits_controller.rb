class TraitsController < ApplicationController

  def index
    trait = Trait.all
    render json: { 
      default: trait.select{ |trait| trait.type === nil }, 
      education: trait.select{ |trait| trait.type === "Education" } 
    }.to_json(methods: :type)
  end

end