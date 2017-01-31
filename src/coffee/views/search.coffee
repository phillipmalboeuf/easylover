class Lover.Views.Search extends Backbone.View

	el: $("#search")


	data: {}
	events: 
		"click [data-hide]": "hide"


	initialize: ->

		this.render()




	render: ->

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
		this.$el.find("[type='search']").focus()


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.removeClass "overlay--show"



