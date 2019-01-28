class Lover.Views.Nav extends Backbone.View



	events: {
		"click [data-toggle-cart]": "toggle_cart"
		"mouseover [data-show-sub]": "show_sub"
		"mouseout [data-sub]": "hide_sub"
	}
	




	initialize: ->

		this.render()



	render: ->

		this



	toggle_cart: (e)->
		e.preventDefault()
		$(e.currentTarget).blur()
		Lover.cart_view.toggle()












