class Idea < ApplicationRecord
	 validates_presence_of :description
	 has_many :comments
	 belongs_to :user
end
