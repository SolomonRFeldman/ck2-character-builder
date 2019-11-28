class ChangeHealthToFloatInCharacterAttributes < ActiveRecord::Migration[6.0]
  def change
    change_column :character_attributes, :health, :float
  end
end
