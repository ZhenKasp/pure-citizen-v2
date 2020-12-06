class Post < ActiveRecord::Base
  belongs_to :user
  has_one_attached :image

  def as_json(_)
    {
      title: title,
      body: body,
      latitude: latitude,
      longitude: longitude,
      author: user.first_name + " " + user.last_name,
      url: image.service_url
    }
  end
end
