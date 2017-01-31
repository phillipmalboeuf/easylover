class Lover.Views.Header extends Backbone.View



	events: {
		"click [data-close-alert]": "close_alert"
	}
	




	initialize: ->

		this.render()

		



	render: ->
		this.check_scroll()
		$(window).on("scroll", this.check_scroll.bind(this))

		this


	check_scroll: (e)->
		if window.pageYOffset > 0
			this.$el.addClass "header--scrolled" unless this.$el.hasClass "header--scrolled"
		else
			this.$el.removeClass "header--scrolled" if this.$el.hasClass "header--scrolled"



	close_alert: (e)->
		e.preventDefault()

		this.$el.find("[data-header-alert]").addClass "fade_out"



	undelegateEvents: ->

		$(window).off("scroll", this.check_scroll)

		super()






