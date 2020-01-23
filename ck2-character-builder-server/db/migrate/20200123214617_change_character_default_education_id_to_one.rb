class ChangeCharacterDefaultEducationIdToOne < ActiveRecord::Migration[6.0]
  def change
    change_column_default :characters, :education_id, from: nil, to: 1
  end
end
