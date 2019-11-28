class CreateCharacter < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :dynasty
      t.boolean :marriage_status
      t.string :culture
      t.string :religion
      t.string :sex
    end
  end
end
