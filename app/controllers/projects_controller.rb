class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show upload]

  def index
  	@projects = session[:user_id].present? && @project&.user == @current_user ? @current_user&.projects : session[:user_id].present? && @current_user&.accessPin.include?('admin') ? Project.all.reject(&:blank?) : nil
  end

  def show
  end

  def upload
  	begin
	  	if session[:user_id].present? && @project&.user == @current_user
		  	if params[:project][:attachments].present?

		      imageFiles = ''
		      videoFiles = ''
		      xTags = ''

		      if params[:project][:attachments].reject(&:blank?).present?
		        params[:project][:attachments].reject(&:blank?).each do |file|
		          if file.content_type.include?('image')
		            imageFilex = file.tempfile
		            @couldinaryImagex = Cloudinary::Uploader.upload(imageFilex, {detection: "coco", folder: 'yuhtoo-guest-images'})
		            imageFiles.prepend("#{@couldinaryImagex['public_id']},")
		            xTags << "#{@couldinaryImagex['tags'].join(',')},"
		          end
		        
		          if file.content_type.include?('video')
		            videoFilex = file.tempfile
		            @couldinaryVideox = Cloudinary::Uploader.upload(videoFilex, detection: "coco",resource_type: "video", folder: 'yuhtoo-guest-videos')
		            videoFiles.prepend("#{@couldinaryVideox['public_id']},")
		            xTags << "#{@couldinaryVideox['tags'].join(',')},"
		          end
		        end

		      end
		    end

		    if videoFiles.present?
		      @project.update(videos: @project.videos.to_s + videoFiles)
		    end

		    if imageFiles.present?
		      @project.update(attachments: @project.attachments.to_s + imageFiles)
		    end

		    if xTags.present?
		      @project.update(tags: @project.tags.to_s + xTags)
		    end
		    flash[:success] = "Uploaded"
		  	redirect_to project_path(id: @project&.id)
		  else
		  	flash[:error] = "No Access"
		  	redirect_to projects_path
	    end
	  rescue Exception => e
      flash[:error] = e.message
      redirect_to project_path(id: @project&.id)
      return
    end
  end

  def create
  	debugger
  	newProject = @current_user&.projects.create(title: project_params[:title])

  	if newProject.save
	  	flash[:success] = 'Created'
	  	redirect_to project_path(id: newProject&.id)
	  else
	  	flash[:error] = 'Failed'
	  	redirect_to projecst_path
	  end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:title)
  end
end