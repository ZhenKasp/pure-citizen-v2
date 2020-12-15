class Post < ActiveRecord::Base
  belongs_to :user
  has_one_attached :image
  default_scope { order(created_at: :desc) }

  def as_json(_)
    {
      id: id,
      title: title,
      body: body,
      latitude: latitude,
      longitude: longitude,
      author: user.first_name + " " + user.last_name,
      url: image.attached? ? image.service_url : ""
    }
  end
end
