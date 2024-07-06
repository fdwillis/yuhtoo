class CreateIdeas < ActiveRecord::Migration[7.1]
  def change
    create_table :ideas do |t|
      t.text :description
      t.text :images
      t.text :videos
      t.boolean :public
      t.text :titles
      t.text :tags
      t.text :scripts
      t.string :userID

      t.timestamps
    end
  end
end
