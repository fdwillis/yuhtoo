class IdeasController < ApplicationController
  before_action :set_idea, only: %i[reaction like unlike show edit update destroy ]

  

  def unlike
    @idea.update(likes: @idea.likes.gsub(",#{@current_user&.uuid}", ""))
    redirect_to request.referrer
  end

  def like
    @idea.update(likes: "#{@idea&.likes},#{params[:uuid]}")
    @idea
    respond_to do |format|
      format.html
      format.js {render :partial => "ideas/likes", idea: @idea}
    end
    redirect_to @idea
  end

  def reaction
    @idea.comments.find(params[:comment]).update(reactions: "#{@idea&.comments.present? ? @idea&.comments.find(params[:comment]).reactions : ''},#{params[:uuid]}")
    @comment = @idea.comments.find(params[:comment])
    redirect_to @idea
  end

  # GET /ideas or /ideas.json
  def index
    @ideas = Idea.find_each.sort_by(&:created_at).reverse
  end

  # GET /ideas/1 or /ideas/1.json
  def show
    if params['getPaid']
      @panel = 'getPaid'
    elsif params['comments']
      @panel = 'comments'
    elsif params['storyBoard']
      @panel = 'storyBoard'
    end
  end

  # GET /ideas/new
  def new
    @idea = Idea.new
  end

  # GET /ideas/1/edit
  def edit
  end

  # POST /ideas or /ideas.json
  def create
    

    @idea = @current_user.ideas.create(idea_params)

    

    respond_to do |format|
      if @idea.save
        format.html { redirect_to '/feed', notice: "Idea was successfully created." }
        format.json { render :show, status: :created, location: @idea }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end

    if params[:idea][:attachments].present?

      imageFiles = ''
      videoFiles = ''
      xTags = ''

      if params[:idea][:attachments].reject(&:blank?).present?
        params[:idea][:attachments].reject(&:blank?).each do |file|
          if file.content_type.include?('image')
            uploader = ImageUploader.new
            imageFilex = file.tempfile
            @couldinaryImagex = Cloudinary::Uploader.upload(imageFilex, {detection: "coco", categorization: "google_tagging", auto_tagging: 0.6, folder: 'yuhtoo-guest-images'})
            imageFiles.prepend("#{@couldinaryImagex['public_id']},")
            xTags << "#{@couldinaryImagex['tags'].join(',')}&"
          end
        
          if file.content_type.include?('video')
            uploader = ImageUploader.new
            videoFilex = file.tempfile
            @couldinaryVideox = Cloudinary::Uploader.upload(videoFilex, detection: "coco",resource_type: "video", categorization: "google_tagging", auto_tagging: 0.6, folder: 'yuhtoo-guest-videos')
            videoFiles.prepend("#{@couldinaryVideox['public_id']},")
            xTags << "#{@couldinaryVideox['tags'].join(',')}&"
          end
        end

      end
    end

    if videoFiles.present?
      @idea.update(videos: videoFiles)
    end

    if imageFiles.present?
      @idea.update(attachments: imageFiles)
    end

    if xTags.present?
      @idea.update(tags: xTags)
    end
  end

  # PATCH/PUT /ideas/1 or /ideas/1.json
  def update
    respond_to do |format|
      if @idea.update(idea_params)
        format.html { redirect_to idea_url(@idea), notice: "Idea was successfully updated." }
        format.json { render :show, status: :ok, location: @idea }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ideas/1 or /ideas/1.json
  def destroy
    @idea.destroy!

    respond_to do |format|
      format.html { redirect_to ideas_url, notice: "Idea was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_idea
      @idea = Idea.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def idea_params
      params.require(:idea).permit(:description)
    end
end
