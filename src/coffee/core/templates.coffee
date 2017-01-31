Handlebars.registerHelper 'money', (value)->
	if value? then (parseFloat(value)/100)+" CAD" else null


Handlebars.registerHelper 'truncate', (string, end)->
	if string? 
		string = string.slice(0, end)
		string += "..." if string.length >= end

		string

	else 
		null