class Lover.Views.Nav extends Backbone.View



	events: {
		"click [data-toggle-cart]": "toggle_cart"
		"click [data-toggle-search]": "toggle_search"
		"click [data-toggle-login]": "toggle_login"
		"click [data-toggle-account]": "toggle_account"
		"click [data-toggle-burger]": "toggle_burger"
	}
	




	initialize: ->

		this.render()

		



	render: ->

		this.$el.find("[data-sub]").each (index, sub)->
			prev = $(sub).prev()
			if prev.length > 0
				if sub.getAttribute("data-sub") == "right"
					$(sub).css "left", prev.offset().left-$(sub).width()+prev.width()-25
				else
					$(sub).css "left", prev.offset().left+25

				$(sub).css "top", prev.offset().top+prev.height()+10

		this



	toggle_cart: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.cart_view.toggle()

	toggle_search: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.search_view.toggle()

	toggle_login: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.login_view.toggle()

	toggle_account: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.account_view.toggle()


	toggle_burger: (e)->
		$(e.currentTarget).blur()
		
		if $("body").hasClass "has_burger"
			this.hide_burger(e)
		else
			this.show_burger(e)

	show_burger: (e)->
		if e?
			e.preventDefault()

		$("body").addClass "has_burger"
		$(".main").on "click", =>
			this.hide_burger()


	hide_burger: (e)->
		if e?
			e.preventDefault()

		$("body").removeClass "has_burger"
		$(".main").off "click"











