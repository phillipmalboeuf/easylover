this["templates"] = this["templates"] || {};

this["templates"]["cart"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=container.lambda, alias3=container.escapeExpression;

  return "	<h1 class=\"highlight medium_bottom\">Cart</h1>\n\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	<div class=\"padded\">\n		<h5 class=\"medium_bottom\">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.text : depth0)) != null ? stack1.subtotal : stack1), depth0))
    + " <span class=\"highlight\">"
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.total_price : stack1),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</span></h5>\n\n		<button type=\"submit\" name=\"checkout\" class=\"button--big\" "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.text : depth0)) != null ? stack1.checkout : stack1), depth0))
    + "</button>\n	</div>\n\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, buffer = 
  "	<div class=\"cart__item\">\n		<div class=\"grid grid--guttered grid--middle\">\n			<div class=\"col col--4of12\">\n				<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\"></a>\n			</div>\n\n			<div class=\"col col--8of12\">\n				<h5 class=\"small_bottom\"><a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.product_title || (depth0 != null ? depth0.product_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"product_title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
  stack1 = ((helper = (helper = helpers.variant_title || (depth0 != null ? depth0.variant_title : depth0)) != null ? helper : alias2),(options={"name":"variant_title","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.variant_title) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a></h5>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<h6 class=\"medium_bottom\">"
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</h6>\n\n				<p>\n					"
    + alias4(alias5(((stack1 = (depths[1] != null ? depths[1].text : depths[1])) != null ? stack1.quantity : stack1), depth0))
    + "\n					&nbsp;&nbsp;\n					<button class=\"button--transparent\" data-decrement=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">-</button>\n					<span class=\"highlight\">"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</span>\n					<button class=\"button--transparent\" data-increment=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">+</button>\n\n					<br>\n\n					<a href=\"#\" data-remove-from-cart=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"a--highlight\">"
    + alias4(alias5(((stack1 = (depths[1] != null ? depths[1].text : depths[1])) != null ? stack1.remove : stack1), depth0))
    + "</a>\n				</p>\n			</div>\n		</div>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "("
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ")";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "				<div><small>"
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + ": "
    + alias1(container.lambda(depth0, depth0))
    + "</small></div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"padded padded--thick text_center\">\n		<h1>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.text : depth0)) != null ? stack1.empty : stack1), depth0))
    + "</h1>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n<a href=\"#\" class=\"cart__back\" data-hide></a>\n\n\n\n<form action=\"/cart\" method=\"post\" class=\"cart__container text_center\" id=\"cart__form\" novalidate>\n	<div class=\"alert cart__alert fades_out fade_out\" data-cart-error><div class=\"padded\"><span data-cart-error-text></span> <a href=\"#\" class=\"a--underline\" data-close-error>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.text : depth0)) != null ? stack1.alert_close : stack1), depth0))
    + "</a></div></div>\n\n\n	<a href=\"#\" class=\"cart__close a--highlight\" data-hide>X Close</a>\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</form>\n\n";
},"useData":true,"useDepths":true});

this["templates"]["feed"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.link : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"col\" style=\"width: "
    + alias2(alias1((depths[1] != null ? depths[1].width : depths[1]), depth0))
    + "\">\n	<a href=\""
    + alias2(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"\">\n		<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.low_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.caption : depth0)) != null ? stack1.text : stack1), depth0))
    + "\">\n	</a>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.feed : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});