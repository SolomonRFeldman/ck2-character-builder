class AddEffectsToTraits < ActiveRecord::Migration[6.0]
  def change
    add_column :traits, :effects, :json, default: {}
  end
end
