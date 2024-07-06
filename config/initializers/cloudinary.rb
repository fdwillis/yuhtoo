require 'cloudinary'

Cloudinary.config_from_url("cloudinary://#{ENV['cloudinaryKey']}:#{ENV['cloudinarySecret']}@fdwillis")