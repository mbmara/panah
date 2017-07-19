class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
    	t.string :fname
    	t.string :lname
    	t.string :mname
    	t.string :email
    	t.string :password
    	t.belongs_to :user_type
    	t.integer :office_id
      	t.timestamps
    end
  end
end
