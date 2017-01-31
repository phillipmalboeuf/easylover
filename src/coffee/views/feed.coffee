class Lover.Views.Feed extends Backbone.View

	template: templates["feed"]


	data: {}
	events: {}




	initialize: ->
		@feed = new Lover.Collections.Feed({
			user_id: this.$el.attr("data-feed-user-id")
			access_token: this.$el.attr("data-feed-access-token")
			limit: this.$el.attr("data-feed-limit")
		})

		this.listenTo @feed, "sync", this.render
		@width = this.$el.attr("data-feed-photo-width")+"%"

		this.render()

		



	render: ->
		_.extend @data, 
			feed: @feed.toJSON()
			width: @width

		this.$el.html @template(@data)

		this



