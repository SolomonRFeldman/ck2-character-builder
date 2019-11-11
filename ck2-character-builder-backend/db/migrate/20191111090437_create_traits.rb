class CreateTraits < ActiveRecord::Migration[6.0]
  def change
    create_table :traits do |t|
      t.string :name
      t.text :description
      t.integer :cost
      t.string :group
      t.string :type
    end
  end
end
