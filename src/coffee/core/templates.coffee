Handlebars.registerHelper 'money', (value)->
	if value? then (parseFloat(value)/100)+" CAD" else null

Handlebars.registerHelper 'thumbnail', (image)->
	image.replace(/(\.[^.]*)$/, "_medium$1").replace('http:', '')

Handlebars.registerHelper 'truncate', (string, end)->
	if string? 
		string = string.slice(0, end)
		string += "..." if string.length >= end

		string

	else 
		null