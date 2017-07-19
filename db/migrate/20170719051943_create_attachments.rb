class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments do |t|
    	t.string :attachment
      	t.belongs_to :post
      	t.belongs_to :user
		t.timestamps
    end
  end
end
