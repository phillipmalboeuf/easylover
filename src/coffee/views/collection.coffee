class Lover.Views.Collection extends Backbone.View



	events: {
		"click [data-filter-tag]": "filter_tag"
		"click [data-scroll-to]": "scroll_to"
	}


	filters: []


	initialize: ->
		console.log "Collection: " + this.$el.attr("data-collection-id")

		this.render()

		



	render: ->

		@sticks = this.$el.find("[data-sticks]")

		if @sticks.length > 0
			@offset = @sticks.offset().top

			if window.innerWidth > 600
				this.check_scroll()
				$(window).on("scroll", this.check_scroll.bind(this))
		
		this



	filter_tag: (e)->
		if e.currentTarget.checked
			@filters.push e.currentTarget.value
			this.$el.find(".product." + e.currentTarget.value).first().velocity("scroll", { duration: 1666, easing: "easeOutQuart", offset: -80 })
		else
			@filters = _.without @filters, e.currentTarget.value

		if @filters.length
			this.$el.find(".product").addClass "product--disabled"
			for filter in @filters
				this.$el.find(".product." + filter).removeClass("product--disabled").addClass "product--highlight"

		else
			this.$el.find(".product").removeClass("product--disabled").removeClass("product--highlight")


	scroll_to: (e)->
		scroll_to = $("#" + e.currentTarget.getAttribute("data-scroll-to"))

		if scroll_to.length > 0
			e.preventDefault()
			e.stopImmediatePropagation()

			scroll_to.velocity("scroll", { duration: 1666, easing: "easeOutQuart", offset: -80 })


	check_scroll: (e)->
		if window.pageYOffset > @offset - 100
			@sticks.addClass "sticks--fixed" unless @sticks.hasClass "sticks--fixed"
		else
			@sticks.removeClass "sticks--fixed" if @sticks.hasClass "sticks--fixed"


	undelegateEvents: ->

		$(window).off("scroll", this.check_scroll)

		super()

