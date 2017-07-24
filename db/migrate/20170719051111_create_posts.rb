class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
    	t.belongs_to :user
      	t.string :title
      	t.text :body
        t.text :abstract
      	t.text :tags
      	t.integer :status
      	t.datetime :reviewed_at
      	t.string :author
      	t.string :promulgation_date
      	t.string :case_number
      	t.string :document_type
        t.string :decision
        t.text :links
        t.string :subject
        t.string :parties
      	t.timestamps
    end
  end
end
