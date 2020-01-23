class ChangeCharacterDefaultEducationIdToNil < ActiveRecord::Migration[6.0]
  def change
    change_column_default :characters, :education_id, from: 1, to: nil
  end
end
