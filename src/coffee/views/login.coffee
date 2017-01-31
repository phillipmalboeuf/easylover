class Lover.Views.Login extends Lover.Views.Slider

	el: $("#login")



	data: {}
	events: 
		"click [data-hide]": "hide"
		"submit #customer_login": "customer_login"
		"submit #create_customer": "create_customer"
		"click [data-submit]": "submit_form"
		"click [data-slide-marker]": "slide_to"




	initialize: ->

		super()



	render: ->

		super()


	customer_login: (e)->
		e.preventDefault()

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		$.ajax e.currentTarget.getAttribute("action"),
			method: "POST"
			dataType: "html"
			data: {
				"customer[email]": e.currentTarget["customer[email]"].value
				"customer[password]": e.currentTarget["customer[password]"].value
				form_type: "customer_login"
				utf8: "✓"
			}
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				errors = $(response).find(".errors")
				if errors.length > 0
					$(e.currentTarget).find("[data-errors]").text(errors.text())

				else
					$(e.currentTarget).find("[data-errors]").text("")
					Turbolinks.visit "/account"

					this.hide()



	create_customer: (e)->
		e.preventDefault()

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		$.ajax e.currentTarget.getAttribute("action"),
			method: "POST"
			data: {
				"customer[email]": e.currentTarget["customer[email]"].value
				"customer[password]": e.currentTarget["customer[password]"].value
				"customer[first_name]": e.currentTarget["customer[first_name]"].value
				"customer[last_name]": e.currentTarget["customer[last_name]"].value
				form_type: "create_customer"
				utf8: "✓"
			}
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				errors = $(response).find(".errors")
				if errors.length > 0
					$(e.currentTarget).find("[data-errors]").text(errors.text())

				else
					$(e.currentTarget).find("[data-errors]").text("")
					Turbolinks.visit "/account"

					this.hide()




	toggle: (e)->
		if this.$el.hasClass "overlay--show"
			this.hide(e)

		else
			this.show(e)


	show: (e, index=0)->
		if e?
			e.preventDefault()
	
		this.$el.find("#login_email").focus()
		this.$el.addClass "overlay--show"


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.removeClass "overlay--show"


