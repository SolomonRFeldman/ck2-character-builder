class CreateCharacterAttributes < ActiveRecord::Migration[6.0]
  def change
    create_table :character_attributes do |t|
      t.integer :character_id
      t.integer :diplomacy
      t.integer :martial
      t.integer :stewardship
      t.integer :intrigue
      t.integer :learning
      t.integer :health
      t.integer :fertility
      t.integer :sons
      t.integer :daughters
    end
  end
end
