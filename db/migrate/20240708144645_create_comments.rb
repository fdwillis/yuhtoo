class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.belongs_to :idea, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.text :reactions
      t.text :body
      t.boolean :approved

      t.timestamps
    end
  end
end
