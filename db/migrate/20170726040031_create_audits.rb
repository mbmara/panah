class CreateAudits < ActiveRecord::Migration[5.1]
  def change
    create_table :audits do |t|
    	t.belongs_to :user
    	t.string :purpose
    	t.boolean :status
      	t.timestamps
    end
  end
end
