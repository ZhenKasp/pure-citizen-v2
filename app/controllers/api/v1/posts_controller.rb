class Api::V1::PostsController < ApplicationController
  def index
    render json: { posts: Post.all }
  end

  def show
    post = Post.find(params[:id])
    if post
      render json: { success: true, post: post }
    else
      render json: { success: false, errors: post.errors.full_messages }
    end
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: { success: true, post: post, message: "Record successfuly updated" }
    else
      render json: { success: false, errors: post.errors.full_messages }
    end
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
  end

  private

  def post_params
    params.require(:post).permit(
      :title, :body, :image, :user_id, :longitude, :latitude
    )
  end
end
