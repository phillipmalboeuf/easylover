class Lover.Views.CustomProduct extends Lover.Views.Product


	events: 
		"click [name='variant']": "change_variant"
		"click [data-add-product]": "add_product"
		"click [data-add-to-cart]": "add_to_cart"
		"click [data-product-spot]": "remove_product"


	products: []
	size: 0


	initialize: ->
		
		super()

		console.log "Custom!"


	render: ->
		@size = parseInt this.$el.attr("data-custom-size")
		if @size < @products.length
			@products = @products.slice(0, @size)

		@spots = this.$el.find("[data-product-spot]")
		@spots.attr "data-product-spot", ""
		@spots.attr "src", ""

		for product, index in @products
			@spots[index].setAttribute "data-product-spot", product.title
			@spots[index].setAttribute "src", product.image

		this.$el.find("[data-add-to-cart]").attr "disabled", @products.length != @size

		super()


	add_to_cart: (e, data={})->

		products_text = ""
		for product in @products
			products_text += product.title+", "

		data["properties["+this.$el.attr("data-custom-label")+"]"] = products_text.substring(0, products_text.length - 2)

		super(e, data)



	add_product: (e)->
		e.preventDefault()

		if @products.length < @size
			@products.push {
				title: e.currentTarget.getAttribute "data-add-product"
				image: e.currentTarget.getAttribute "data-add-product-image"
			}

			this.render()


	remove_product: (e)->
		e.preventDefault()

		@products.splice(@spots.index(e.currentTarget), 1)

		this.render()
		






