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
    @ideas = current_user&.accessPin.include?('admin') ? Idea.find_each.sort_by(&:created_at).reverse : current_user&.ideas.sort_by(&:created_at)
    @library = Library.find_each.sort_by(&:created_at).shuffle
    @niches = Niche.all.shuffle
  end

  # GET /ideas/1 or /ideas/1.json
  def show
    @cleanedTops = []
    @cleanedPayInts = []
    @totalAmount = 0
    @totalPayout = 0
    @userXinvestment = 0
    @amountReceived = 0
    @amountForfeit = 0

    if params['getPaid']
      @panel = 'getPaid'
    elsif params['comments']
      @panel = 'comments'
    elsif params['storyBoard']
      @panel = 'storyBoard'
    elsif params['splits']
      @panel = 'splits'
    end

    Stripe::PaymentIntent.list().auto_paging_each do |paymentInt|
      if paymentInt['metadata']['ideaUUID']==@idea&.uuid
        @cleanedPayInts << paymentInt
      end
    end

    if @cleanedPayInts.present?
      @cleanedPayInts.each do |paymentIntX|
        @totalAmount += paymentIntX['metadata']['rawAmount'].to_f

        if session[:user_id].present? && (paymentIntX['customer'] == User.find(session[:user_id])&.stripeCustomerID)
          @userXinvestment += @totalAmount
          @amountReceived += paymentIntX['metadata']['running'].to_f
          @amountForfeit += paymentIntX['metadata']['forfeit'].to_f
        end
      end
    end



    Stripe::Topup.list().auto_paging_each do |topUpx|
      if topUpx['metadata']['paid'] == 'true' && topUpx['metadata']['ideaUUID'] == @idea&.uuid
        @cleanedTops << topUpx
      end
    end
    if @cleanedTops.present?
      @cleanedTops.each do |topUpX|
        @totalPayout += topUpX['amount'].to_f
      end
    end

  end

  # GET /ideas/new
  def new
    @idea = Idea.new
  end

  # GET /ideas/1/edit
  def edit
    unless @idea&.user == @current_user
      flash[:alert] = 'Access Denied'
      redirect_to '/feed'
      return
    end
  end

  def download
    # open('image.png', 'wb') do |file|
    #   file << open('http://example.com/image.png').read
    # end

    # URI.open(params['file']) {|f|
    #   f.each_line {|line| open(params['path']).read}
    # }

    # File.write params['file'], open(params['path']).read

    # image_url = params['path']

    fileName = "#{params['file'].split('/')[1]}#{ params['file'].include?('video') ? ".mov" : ".png"}"

    IO.copy_stream(URI.open(params['path']), fileName)
    # IO.copy_stream(URI.open(params['path']), "#{params['file'].split('/')[1]}.mov")


    flash[:notice] = "#{fileName} downloaded to your device"
    redirect_to request.referrer
  end

  # POST /ideas or /ideas.json
  def create
    begin
      @idea = @current_user.ideas.create(idea_params)

      

      if params[:idea][:attachments].present?

        imageFiles = ''
        videoFiles = ''
        xTags = ''

        if params[:idea][:attachments].reject(&:blank?).present?
          params[:idea][:attachments].reject(&:blank?).each do |file|
            if file.content_type.include?('image')
              uploader = ImageUploader.new
              imageFilex = file.tempfile
              @couldinaryImagex = Cloudinary::Uploader.upload(imageFilex, {detection: "coco", categorization: "google_tagging", auto_tagging: 0.1, folder: 'yuhtoo-guest-images'})
              imageFiles.prepend("#{@couldinaryImagex['public_id']},")
              xTags << "#{@couldinaryImagex['tags'].join(',')},"
            end
          
            if file.content_type.include?('video')
              uploader = ImageUploader.new
              videoFilex = file.tempfile
              @couldinaryVideox = Cloudinary::Uploader.upload(videoFilex, detection: "coco",resource_type: "video", categorization: "google_video_tagging", auto_tagging: 0.1, folder: 'yuhtoo-guest-videos')
              videoFiles.prepend("#{@couldinaryVideox['public_id']},")
              xTags << "#{@couldinaryVideox['tags'].join(',')},"
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
      respond_to do |format|
        if @idea.save
          format.html { redirect_to '/feed', notice: "Idea posted to The Feed" }
          format.json { render :show, status: :created, location: @idea }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @idea.errors, status: :unprocessable_entity }
        end
      end
    rescue Exception => e
      flash[:error] = e.message
      redirect_to '/'
      return
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
      @payoutInfo = @current_user.present? ? @current_user.payoutStatus : {stripeAccountID: 0, stripeCustomerID: 0, commentCount: 0  }
    end

    # Only allow a list of trusted parameters through.
    def idea_params
      params.require(:idea).permit(:description, :uuid)
    end
end
