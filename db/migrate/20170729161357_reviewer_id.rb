class ReviewerId < ActiveRecord::Migration[5.1]
  def change
  	add_column :posts, :reviewe_id, :integer
  end
end
