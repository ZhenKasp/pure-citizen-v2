class Api::V1::MyPostsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    render json: { posts: current_user.posts }
  end
end
