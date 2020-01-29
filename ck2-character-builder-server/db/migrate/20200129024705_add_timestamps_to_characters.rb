class AddTimestampsToCharacters < ActiveRecord::Migration[6.0]
  def change
    add_timestamps :characters, null: true 
    now = DateTime.now
    Character.update_all(created_at: now, updated_at: now)
    change_column_null :characters, :created_at, null: false
    change_column_null :characters, :updated_at, null: false
  end
end
