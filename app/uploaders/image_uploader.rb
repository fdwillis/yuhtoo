class ImageUploader < CarrierWave::Uploader::Base
  storage :file
  include Cloudinary::CarrierWave

  process convert: 'png'
  #chat GPT based off image processing -> maybe need to update after processing and minimizing file sie
  process tags: ['post_picture']

  version :standard do
    process resize_to_fill: [100, 150, :north]
  end

  version :thumbnail do
    resize_to_fit(50, 50)
  end

  def public_id
    return SecureRandom.uuid[0..20]
  end  
end
