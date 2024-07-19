class CreateAlerts < ActiveRecord::Migration[7.1]
  def change
    create_table :alerts do |t|
      t.integer :idea_id
      t.string :alertMembers
      t.string :url
      t.text :description
      t.integer :user_id
      t.string :seenBy
      t.string :alertType

      t.timestamps
    end
  end
end
