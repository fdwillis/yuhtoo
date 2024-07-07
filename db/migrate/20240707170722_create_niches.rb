class CreateNiches < ActiveRecord::Migration[7.1]
  def change
    create_table :niches do |t|
      t.string :title
      t.text :keywords

      t.timestamps
    end
  end
end
