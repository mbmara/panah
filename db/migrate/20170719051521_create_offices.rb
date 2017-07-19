class CreateOffices < ActiveRecord::Migration[5.1]
  def change
    create_table :offices do |t|
      	t.string :name
      	t.string :acronym
      	t.string :document_types
      	t.string :logo
      	t.timestamps
    end
  end
end
