class Lover.Views.Cart extends Backbone.View

	el: $("#cart")
	template: templates["cart"]



	data: {}
	events: 
		"click [data-remove-from-cart]": "remove_from_cart"
		"click [data-increment]": "increment"
		"click [data-decrement]": "decrement"
		"click [data-close-error]": "close_error"
		"click [data-hide]": "hide"




	initialize: ->
		this.listenTo @model, "sync", this.render

		this.render()

		



	render: ->
		_.extend @data, 
			model: @model.toJSON()
			text: window.cart_text

		this.$el.html @template(@data)
		$("[data-item-count]").text @model.get("item_count")

		# if @model.get("item_count")?
		# 	if @model.get("item_count") > 0
		# 		$("[data-toggle-cart]").addClass "nav__link--active"
		# 	else
		# 		$("[data-toggle-cart]").removeClass "nav__link--active"

		# Currency.convertAll(shopCurrency, cookieCurrency)


		this


	toggle: (e)->
		if this.$el.hasClass "overlay--show"
			this.hide(e)

		else
			this.show(e)


	show: (e)->
		if e?
			e.preventDefault()
	
		this.$el.addClass "overlay--show"


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.removeClass "overlay--show"



	remove_from_cart: (e)->
		e.preventDefault()

		Lover.cart.remove $(e.currentTarget).attr("data-remove-from-cart")


	increment: (e)->
		e.preventDefault()

		Lover.cart.change $(e.currentTarget).attr("data-increment"), parseInt($(e.currentTarget).attr("data-current-quantity"))+1


	decrement: (e)->
		e.preventDefault()

		Lover.cart.change $(e.currentTarget).attr("data-decrement"), parseInt($(e.currentTarget).attr("data-current-quantity"))-1


	show_error: (error)->
		this.$el.find("[data-cart-error-text]").text error
		this.$el.find("[data-cart-error]").removeClass "fade_out"


	close_error: (e)->
		e.preventDefault()

		this.$el.find("[data-cart-error]").addClass "fade_out"




