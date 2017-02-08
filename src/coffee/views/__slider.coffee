
class Lover.Views.Slider extends Backbone.View


	current_slide: 0

	events: {
		"click [data-next-slide-button]": "next_slide"
		"click [data-previous-slide-button]": "previous_slide"
		"click [data-slide-marker]": "slide_to"
	}

	
	initialize: ->
		@slides_count = this.$el.find("[data-slide]").length

		this.render()

		



	render: ->
		# this.$el.find("[data-slider-container]").css "width", @slides_count+"00%"
		# this.$el.find("[data-slide]").css "width", (100/@slides_count)+"%"
		# @previous_slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		# this.$el.find("[data-slider-container]").css "height", "-="+(this.$el.find("[data-slide="+@current_slide+"]").height() - @previous_slide_height)+"px"
		this.$el.find("[data-slide="+@current_slide+"]").css "opacity", 1

		this.reset_autoplay()


		this



	next_slide: (e)->
		if @current_slide == @slides_count - 1
			this.slide_to(e, 0)

		else
			this.slide_to(e, @current_slide + 1)


	previous_slide: (e)->
		if @current_slide == 0
			this.slide_to(e, @slides_count - 1)

		else
			this.slide_to(e, @current_slide - 1)


	slide_to: (e, index)->
		if e?
			# index = parseInt(e.currentTarget.getAttribute "data-slide-marker")
			e.preventDefault()
			e.currentTarget.blur()

			this.reset_autoplay()

		@current_slide = index
		this.$el.find("[data-slide-marker]").removeClass "slider__marker--active"
		this.$el.find("[data-slide-marker="+@current_slide+"]").addClass "slider__marker--active"

		# slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		# this.$el.find("[data-slider-container]").css "height", "-="+(@previous_slide_height - slide_height)+"px"

		# @previous_slide_height = slide_height

		this.$el.find("[data-slide]").css "opacity", 0.3
		this.$el.find("[data-slide]").css "transform", "translateX(-"+@current_slide+"00%)"
		this.$el.find("[data-slide="+@current_slide+"]").css "opacity", 1


	reset_autoplay: ->
		if this.el.hasAttribute "data-slider-autoplay"
			window.clearInterval @interval if @interval? 
			@interval = window.setInterval =>
				this.next_slide()

			, this.$el.attr "data-slider-autoplay"
		




