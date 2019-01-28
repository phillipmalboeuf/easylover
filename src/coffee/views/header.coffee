class Lover.Views.Header extends Backbone.View



	events: {
		"click [data-close-alert]": "close_alert"
		"click [data-toggle-cart]": "toggle_cart"
		"mouseenter [data-show-sub]": "show_sub"
		"mouseleave [data-sub]": "hide_sub"
		"click [data-toggle-sub]": "toggle_sub"
	}
	




	initialize: ->

		this.render()

		



	render: ->
		# this.check_scroll()
		# $(window).on("scroll", this.check_scroll.bind(this))

		this


	# check_scroll: (e)->
	# 	if window.pageYOffset > 0
	# 		this.$el.addClass "header--scrolled" unless this.$el.hasClass "header--scrolled"
	# 	else
	# 		this.$el.removeClass "header--scrolled" if this.$el.hasClass "header--scrolled"


	undelegateEvents: ->

		# $(window).off("scroll", this.check_scroll)

		super()



	toggle_cart: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.cart_view.toggle()



	close_alert: (e)->
		e.preventDefault()

		this.$el.find("[data-header-alert]").addClass "fade_out"


	toggle_sub: (e)->
		console.log(e.currentTarget)
		this.$el.find("[data-sub='"+$(e.currentTarget).attr("data-toggle-sub")+"']").toggleClass "header__sub--show"


	show_sub: (e)->
		this.$el.find("[data-sub='"+$(e.currentTarget).attr("data-show-sub")+"']").addClass "header__sub--show"


	hide_sub: (e)->
		this.$el.find("[data-sub]").removeClass "header__sub--show"








