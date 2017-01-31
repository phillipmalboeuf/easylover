class Lover.Models.Cart extends Backbone.Model


	url: "/cart.js"


	parse: (response)->

		response



	initialize: ->

		this.fetch()



	add: (id, quantity=1, data={})->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		data["id"] = id
		data["quantity"] = quantity

		$.ajax "/cart/add.js",
			method: "POST"
			dataType: "json"
			data: data
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			error: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				Lover.cart_view.show_error(response.responseJSON.description)


			



	change: (key, quantity)->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		post = $.ajax "/cart/change.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: key
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			error: (response)=>
				console.log response

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				Lover.cart_view.show_error(response.responseJSON.description)


			


	remove: (key)->

		this.change key, 0




			





