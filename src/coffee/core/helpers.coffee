Lover.helpers =

	get_query_string: ->
		result = {}
		query_string = location.search.slice(1)
		regex = /([^&=]+)=([^&]*)/g
		m = null

		while (m = regex.exec(query_string))
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])

		result