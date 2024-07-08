class Comment < ApplicationRecord
  belongs_to :idea
  belongs_to :user
  has_many :replies
end
