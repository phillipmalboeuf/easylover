class Lover.Views.Newsletter extends Backbone.View

	el: $("#newsletter")


	data: {}
	events: 
		"click [data-hide]": "hide"


	initialize: ->

		this.render()


	render: ->

		unless Lover.cookies.get("newsletter_hidden")?
			delay = this.$el.attr("data-newsletter-delay")
			unless delay == "never"
				setTimeout =>
					this.show()
				, this.$el.attr("data-newsletter-delay")*1000

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
		Lover.cookies.set "newsletter_hidden", true



