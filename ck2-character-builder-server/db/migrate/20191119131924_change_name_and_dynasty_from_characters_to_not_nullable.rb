class ChangeNameAndDynastyFromCharactersToNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column :characters, :name, :string, null: false
    change_column :characters, :dynasty, :string, null: false
  end
end
