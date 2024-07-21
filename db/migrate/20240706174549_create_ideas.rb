class CreateIdeas < ActiveRecord::Migration[7.1]
  def change
    create_table :ideas do |t|
      t.string :uuid
      t.string :spinOffFrom
      t.text :likes
      t.text :description
      t.text :attachments
      t.text :videos
      t.boolean :public, default: false
      t.boolean :monetized, default: false
      t.text :titles
      t.text :tags
      t.text :scripts
      t.text :transactions
      t.string :userID
      t.integer :fundingAmount, default: 100
      
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
