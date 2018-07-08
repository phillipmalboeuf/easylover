
class Lover.Views.Slider extends Backbone.View

	events: {
	}

	
	initialize: ->
		this.render()

		


	render: ->
		this.$el.flickity({
			imagesLoaded: true,
			wrapAround: true,
			prevNextButtons: false,
			percentPosition: false
		})

		this



		




