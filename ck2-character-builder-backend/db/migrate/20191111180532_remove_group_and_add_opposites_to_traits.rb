class RemoveGroupAndAddOppositesToTraits < ActiveRecord::Migration[6.0]
  def change
    remove_column :traits, :group
    add_column :traits, :opposites, :json, default: []
  end
end
