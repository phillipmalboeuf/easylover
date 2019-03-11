window.Lover =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}

	


	init: ->
		console.log "Easy Lover"

		@cart = new Lover.Models.Cart()
		@cart_view = new Lover.Views.Cart
			model: @cart

		# @search_view = new Lover.Views.Search()
		# @login_view = new Lover.Views.Login()
		@newsletter_view = new Lover.Views.Newsletter()
		@country_view = new Lover.Views.CountrySelector()


		# $(window).on "keyup", (e)=>
		# 	if e.keyCode == 27
		# 		if $("body").hasClass "has_cart"
		# 			@cart_view.hide()
		# 		else
		# 			@search_view.toggle()


		# @login_view = new Lover.Views.Login()
		# @account_view = new Lover.Views.Account()

		@views = []

		this.render_views()
		document.addEventListener "turbolinks:load", =>
			this.render_views()

			ga('send', 'pageview') if ga?

			if fbq?
				fbq('track', 'PageView') 

				$("[data-product-id]").each (index, element)=>
					fbq("track", "ViewContent", {
						content_ids: [element.getAttribute("data-product-id")],
						content_type: "product_group",
						content_name: $(element).find("[itemprop='name']").attr("content"),
						content_category: $(element).find("[itemprop='type']").attr("content"),
						currency: "USD",
						value: $(element).find("[itemprop='price']").attr("content")
					})

		# window.onpopstate = (e)->
		# 	Turbolinks.visit window.location.pathname+window.location.search, {action: "replace"}



	render_views: ->
		for view in @views
			view.undelegateEvents()

		delete @views
		@views = []


		$("[data-navigation]").each (index, element)=>
			@views.push new Lover.Views.Nav({
				el: element
			})

		$("[data-header]").each (index, element)=>
			@views.push new Lover.Views.Header({
				el: element
			})

		$("[data-filters]").each (index, element)=>
			@views.push new Lover.Views.Filters({
				el: element
			})

		$("[data-slider]").each (index, element)=>
			@views.push new Lover.Views.Slider({
				el: element
			})

		$("[data-feed]").each (index, element)=>
			@views.push new Lover.Views.Feed({
				el: element
			})

		$("[data-map]").each (index, element)=>
			@views.push new Lover.Views.Map({
				el: element
			})

		$("[data-product-id]").each (index, element)=>
			if element.hasAttribute("data-custom-size")
				@views.push new Lover.Views.CustomProduct({
					el: element
				})

			else
				@views.push new Lover.Views.Product({
					el: element
				})

		if window.innerWidth <= 600
			$("[data-product-images]").each (index, element)=>
				@views.push new Lover.Views.Slider({
					el: element
				})

		$("[data-collection-id]").each (index, element)=>
			@views.push new Lover.Views.Collection({
				el: element
			})

		if $("[data-show-cart]").length > 0
			@cart_view.show()

		if $("[data-show-search]").length > 0
			@search_view.show()



		# @login_views = []
		# $(".js-login").each (index, el)=>
		# 	@login_views.push new Lover.Views.Login({el: $(el)})


		







Lover = window.Lover
_ = window._
Backbone = window.Backbone



$ ->
	Lover.init()

