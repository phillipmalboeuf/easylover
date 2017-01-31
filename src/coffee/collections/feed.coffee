class Lover.Collections.Feed extends Backbone.Collection

	

	parse: (response)->
		return response.data


	initialize: (options={})->
		@url = "https://api.instagram.com/v1/users/"+options.user_id+"/media/recent?access_token="+options.access_token+"&count="+options.limit

		this.fetch
			success: (model, response)->
				# console.log response
				# console.log model



	sync: (method, collection, options)->
		params = _.extend options, {
			type: 'GET',
			dataType: 'jsonp',
			url: collection.url
			processData: false
		}

		return $.ajax(params)




