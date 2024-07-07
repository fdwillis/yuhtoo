class CreateExperts < ActiveRecord::Migration[7.1]
  def change
    create_table :experts do |t|
      t.string :name
      t.string :link
      t.string :image

      t.timestamps
    end
  end
end
