class CreateIdeas < ActiveRecord::Migration[7.1]
  def change
    create_table :ideas do |t|
      t.text :description
      t.text :attachments
      t.text :videos
      t.boolean :public, default: false
      t.boolean :monetized, default: false
      t.text :titles
      t.text :tags
      t.text :scripts
      t.string :userID

      t.timestamps
    end
  end
end
