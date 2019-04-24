class Lover.Views.CountrySelector extends Backbone.View

	el: $("#countries")


	data: {}
	events: 
		"click [data-hide]": "hide"


	initialize: ->

		this.render()


	render: ->

		unless Lover.cookies.get("countries_hidden")?
			country = this.$el.attr("data-country")
			$.ajax "https://bombombaby.com/ipcheck",
				method: "GET"
				dataType: "json"
				success: (response)=>
					console.log(country)
					console.log(response)
					if country == 'CA' && response.country_code != 'CA'
						this.show()
					else
						if country == 'US' && response.country_code == 'CA'
							this.show()

		this


	toggle: (e)->
		if this.$el.hasClass "newsletter--show"
			this.hide(e)

		else
			this.show(e)


	show: (e)->
		if e?
			e.preventDefault()
	
		this.$el.addClass "newsletter--show"
		# this.$el.find("[type='email']").focus()


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.removeClass "newsletter--show"
		Lover.cookies.set "countries_hidden", true



