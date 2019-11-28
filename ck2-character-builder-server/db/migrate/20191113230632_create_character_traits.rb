class CreateCharacterTraits < ActiveRecord::Migration[6.0]
  def change
    create_table :character_traits do |t|
      t.integer :character_id
      t.integer :trait_id
    end
  end
end
