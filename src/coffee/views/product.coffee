class Lover.Views.Product extends Backbone.View


	style: "Street"

	events: 
		"click [name='colour']": "change_colour"
		"click [data-thumbnail]": "show_image"
		"submit [data-add-to-cart-form]": "add_to_cart"
		"change [name='style']": "change_style"


	initialize: ->
		console.log "Product: " + this.$el.attr("data-product-id")

		this.render()


	render: ->

		this.$el.find("[name='properties[name]']").focus()
		this.$el.addClass "product--"+@style

		this


	change_style: (e)->
		this.$el.removeClass "product--"+@style
		@style = e.currentTarget.value
		this.$el.addClass "product--"+@style


	# change_variant: (e)->
	# 	id = this.$el.find("[name='variant']:checked").val()
	# 	if id?
	# 		Turbolinks.visit window.location.pathname+"?variant="+id
	# 	else
	# 		Turbolinks.visit window.location.pathname

	change_colour: (e)->
		id = e.currentTarget.value
		if id?
			Turbolinks.visit window.location.pathname+"?variant="+id
		else
			Turbolinks.visit window.location.pathname

	show_image: (e)->
		e.preventDefault()
		image = this.$el.find("[data-featured-image]")
		image.attr "src", $(e.currentTarget).attr("href")
		this.$el.find("[data-featured-alt]").text $(e.currentTarget).find("img").attr("alt")

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		image.on "load", ()=>
			Turbolinks.controller.adapter.progressBar.setValue(100)
			Turbolinks.controller.adapter.progressBar.hide()



	add_to_cart: (e, data={})->
		e.preventDefault()
		e.stopImmediatePropagation()

		data["properties[Name]"] = e.currentTarget["name"].value
		data["properties[Style]"] = e.currentTarget["style"].value

		Lover.cart.add this.$el.find("[name='size']").val(), 1, data
		Lover.cart_view.show()






