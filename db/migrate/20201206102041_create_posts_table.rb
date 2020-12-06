class CreatePostsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string     :title
      t.text       :body
      t.float      :longitude
      t.float      :latitude
      t.belongs_to :user, null: false
      t.timestamps
    end
  end
end
