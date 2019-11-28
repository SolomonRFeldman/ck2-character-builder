class AddEducationToCharacters < ActiveRecord::Migration[6.0]
  def change
    add_column :characters, :education_id, :integer
  end
end
