class Api::V1::SignInViaGoogleController < ApplicationController
  def create
    profile_object = params[:profileObj]

    user = User
      .create_with(first_name: profile_object[:givenName], last_name: profile_object[:familyName], username: profile_object[:name])
      .find_or_create_by(uid: profile_object[:googleId], provider: 'google_oauth')

    sign_in user
    response.headers.merge!(user.create_new_auth_token)

    render json: { success: true, user: user }
  end
end
