Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV.fetch("APP_ID"), ENV.fetch("APP_SECRET")
end
