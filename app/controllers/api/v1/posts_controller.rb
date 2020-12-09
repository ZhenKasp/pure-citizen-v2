class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!, only: [:update, :create, :destroy]

  def index
    render json: { posts: Post.all }
  end

  def show
    post = Post.find(params[:id])
    render json: { success: true, post: post }
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, errors: "Not found" }
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: { success: true, post: post, message: "Record successfuly updated" }
    else
      render json: { success: false, errors: post.errors.full_messages }
    end
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, errors: "Not found" }
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: { success: true, post: post, message: "Record successfuly created" }
    else
      render json: { success: false, errors: post.errors.full_messages }
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: { success: true, message: "Record successfuly deleted" }
    else
      render json: { success: false, errors: post.errors.full_messages }
    end
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, errors: "Not found" }
  end

  private

  def post_params
    params.require(:post).permit(
      :title, :body, :image, :user_id, :longitude, :latitude
    )
  end
end
