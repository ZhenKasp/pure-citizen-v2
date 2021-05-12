class Api::V1::SignInViaVkController < ApplicationController
  def create
    user = User
      .create_with(first_name: params[:first_name], last_name: params[:last_name], username: "#{params[:first_name]} #{params[:last_name]}")
      .find_or_create_by(uid: params[:uid], provider: 'vk_oauth')

    sign_in user
    response.headers.merge!(user.create_new_auth_token)

    render json: { success: true, user: user }
  end
end
