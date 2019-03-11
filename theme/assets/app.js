(function() {
  var Backbone, Lover, _;

  window.Lover = {
    Collections: {},
    Models: {},
    Views: {},
    Routers: {},
    init: function() {
      console.log("Easy Lover");
      this.cart = new Lover.Models.Cart();
      this.cart_view = new Lover.Views.Cart({
        model: this.cart
      });
      // @search_view = new Lover.Views.Search()
      // @login_view = new Lover.Views.Login()
      this.newsletter_view = new Lover.Views.Newsletter();
      this.country_view = new Lover.Views.CountrySelector();
      // $(window).on "keyup", (e)=>
      // 	if e.keyCode == 27
      // 		if $("body").hasClass "has_cart"
      // 			@cart_view.hide()
      // 		else
      // 			@search_view.toggle()

      // @login_view = new Lover.Views.Login()
      // @account_view = new Lover.Views.Account()
      this.views = [];
      this.render_views();
      return document.addEventListener("turbolinks:load", () => {
        this.render_views();
        if (typeof ga !== "undefined" && ga !== null) {
          ga('send', 'pageview');
        }
        if (typeof fbq !== "undefined" && fbq !== null) {
          fbq('track', 'PageView');
          return $("[data-product-id]").each((index, element) => {
            return fbq("track", "ViewContent", {
              content_ids: [element.getAttribute("data-product-id")],
              content_type: "product_group",
              content_name: $(element).find("[itemprop='name']").attr("content"),
              content_category: $(element).find("[itemprop='type']").attr("content"),
              currency: "USD",
              value: $(element).find("[itemprop='price']").attr("content")
            });
          });
        }
      });
    },
    // window.onpopstate = (e)->
    // 	Turbolinks.visit window.location.pathname+window.location.search, {action: "replace"}
    render_views: function() {
      var i, len, ref, view;
      ref = this.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.undelegateEvents();
      }
      delete this.views;
      this.views = [];
      $("[data-navigation]").each((index, element) => {
        return this.views.push(new Lover.Views.Nav({
          el: element
        }));
      });
      $("[data-header]").each((index, element) => {
        return this.views.push(new Lover.Views.Header({
          el: element
        }));
      });
      $("[data-filters]").each((index, element) => {
        return this.views.push(new Lover.Views.Filters({
          el: element
        }));
      });
      $("[data-slider]").each((index, element) => {
        return this.views.push(new Lover.Views.Slider({
          el: element
        }));
      });
      $("[data-feed]").each((index, element) => {
        return this.views.push(new Lover.Views.Feed({
          el: element
        }));
      });
      $("[data-map]").each((index, element) => {
        return this.views.push(new Lover.Views.Map({
          el: element
        }));
      });
      $("[data-product-id]").each((index, element) => {
        if (element.hasAttribute("data-custom-size")) {
          return this.views.push(new Lover.Views.CustomProduct({
            el: element
          }));
        } else {
          return this.views.push(new Lover.Views.Product({
            el: element
          }));
        }
      });
      if (window.innerWidth <= 600) {
        $("[data-product-images]").each((index, element) => {
          return this.views.push(new Lover.Views.Slider({
            el: element
          }));
        });
      }
      $("[data-collection-id]").each((index, element) => {
        return this.views.push(new Lover.Views.Collection({
          el: element
        }));
      });
      if ($("[data-show-cart]").length > 0) {
        this.cart_view.show();
      }
      if ($("[data-show-search]").length > 0) {
        return this.search_view.show();
      }
    }
  };

  // @login_views = []
  // $(".js-login").each (index, el)=>
  // 	@login_views.push new Lover.Views.Login({el: $(el)})
  Lover = window.Lover;

  _ = window._;

  Backbone = window.Backbone;

  $(function() {
    return Lover.init();
  });

}).call(this);

(function() {
  Lover.cookies = {
    set: function(name, value, expiry_days) {
      var d, expires;
      d = new Date();
      d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toGMTString();
      return document.cookie = "X-" + name + "=" + value + "; " + expires + "; path=/";
    },
    set_for_a_session: function(name, value) {
      return document.cookie = "X-" + name + "=" + value + "; path=/";
    },
    get: function(name) {
      var cookie, cookies, i, len, value;
      name = "X-" + name + "=";
      value = false;
      cookies = document.cookie.split(';');
      for (i = 0, len = cookies.length; i < len; i++) {
        cookie = cookies[i];
        (function(cookie) {
          cookie = cookie.trim();
          if (cookie.indexOf(name) === 0) {
            return value = cookie.substring(name.length, cookie.length);
          }
        })(cookie);
      }
      if (!value) {
        value = null;
      }
      return value;
    },
    delete: function(name) {
      return document.cookie = 'X-' + name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
  };

}).call(this);

(function() {
  Lover.helpers = {
    get_query_string: function() {
      var m, query_string, regex, result;
      result = {};
      query_string = location.search.slice(1);
      regex = /([^&=]+)=([^&]*)/g;
      m = null;
      while ((m = regex.exec(query_string))) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return result;
    }
  };

}).call(this);

(function() {
  Handlebars.registerHelper('money', function(value) {
    if (value != null) {
      return (parseFloat(value) / 100) + " USD";
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('thumbnail', function(image) {
    return image.replace(/(\.[^.]*)$/, "_medium$1").replace('http:', '');
  });

  Handlebars.registerHelper('truncate', function(string, end) {
    if (string != null) {
      string = string.slice(0, end);
      if (string.length >= end) {
        string += "...";
      }
      return string;
    } else {
      return null;
    }
  });

}).call(this);

(function() {
  Lover.Models.Cart = (function() {
    class Cart extends Backbone.Model {
      parse(response) {
        return response;
      }

      initialize() {
        return this.fetch();
      }

      add(id, quantity = 1, data = {}) {
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        data["id"] = id;
        data["quantity"] = quantity;
        return $.ajax("/cart/add.js", {
          method: "POST",
          dataType: "json",
          data: data,
          success: (response) => {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return this.fetch();
          },
          error: (response) => {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return Lover.cart_view.show_error(response.responseJSON.description);
          }
        });
      }

      change(key, quantity) {
        var post;
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return post = $.ajax("/cart/change.js", {
          method: "POST",
          dataType: "json",
          data: {
            quantity: quantity,
            id: key
          },
          success: (response) => {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return this.fetch();
          },
          error: (response) => {
            console.log(response);
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return Lover.cart_view.show_error(response.responseJSON.description);
          }
        });
      }

      remove(key) {
        return this.change(key, 0);
      }

    };

    Cart.prototype.url = "/cart.js";

    return Cart;

  }).call(this);

}).call(this);

(function() {
  Lover.Collections.Feed = class Feed extends Backbone.Collection {
    parse(response) {
      return response.data;
    }

    initialize(options = {}) {
      this.url = "https://api.instagram.com/v1/users/" + options.user_id + "/media/recent?access_token=" + options.access_token + "&count=" + options.limit;
      return this.fetch({
        success: function(model, response) {}
      });
    }

    // console.log response
    // console.log model
    sync(method, collection, options) {
      var params;
      params = _.extend(options, {
        type: 'GET',
        dataType: 'jsonp',
        url: collection.url,
        processData: false
      });
      return $.ajax(params);
    }

  };

}).call(this);

(function() {
  Lover.Views.Slider = (function() {
    class Slider extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        this.$el.flickity({
          imagesLoaded: true,
          wrapAround: true,
          prevNextButtons: false,
          percentPosition: false
        });
        return this;
      }

    };

    Slider.prototype.events = {};

    return Slider;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Nav = (function() {
    class Nav extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        return this;
      }

      toggle_cart(e) {
        e.preventDefault();
        $(e.currentTarget).blur();
        return Lover.cart_view.toggle();
      }

    };

    Nav.prototype.events = {
      "click [data-toggle-cart]": "toggle_cart",
      "mouseover [data-show-sub]": "show_sub",
      "mouseout [data-sub]": "hide_sub"
    };

    return Nav;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Cart = (function() {
    class Cart extends Backbone.View {
      initialize() {
        this.listenTo(this.model, "sync", this.render);
        return this.render();
      }

      render() {
        _.extend(this.data, {
          model: this.model.toJSON(),
          text: window.cart_text
        });
        this.$el.html(this.template(this.data));
        $("[data-item-count]").text(this.model.get("item_count"));
        return this;
      }

      toggle(e) {
        if (this.$el.hasClass("overlay--show")) {
          return this.hide(e);
        } else {
          return this.show(e);
        }
      }

      show(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.addClass("overlay--show");
      }

      hide(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.removeClass("overlay--show");
      }

      remove_from_cart(e) {
        e.preventDefault();
        return Lover.cart.remove($(e.currentTarget).attr("data-remove-from-cart"));
      }

      increment(e) {
        e.preventDefault();
        return Lover.cart.change($(e.currentTarget).attr("data-increment"), parseInt($(e.currentTarget).attr("data-current-quantity")) + 1);
      }

      decrement(e) {
        e.preventDefault();
        return Lover.cart.change($(e.currentTarget).attr("data-decrement"), parseInt($(e.currentTarget).attr("data-current-quantity")) - 1);
      }

      show_error(error) {
        this.$el.find("[data-cart-error-text]").text(error);
        return this.$el.find("[data-cart-error]").removeClass("fade_out");
      }

      close_error(e) {
        e.preventDefault();
        return this.$el.find("[data-cart-error]").addClass("fade_out");
      }

    };

    Cart.prototype.el = $("#cart");

    Cart.prototype.template = templates["cart"];

    Cart.prototype.data = {};

    Cart.prototype.events = {
      "click [data-remove-from-cart]": "remove_from_cart",
      "click [data-increment]": "increment",
      "click [data-decrement]": "decrement",
      "click [data-close-error]": "close_error",
      "click [data-hide]": "hide"
    };

    return Cart;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Collection = (function() {
    class Collection extends Backbone.View {
      initialize() {
        console.log("Collection: " + this.$el.attr("data-collection-id"));
        return this.render();
      }

      render() {
        this.sticks = this.$el.find("[data-sticks]");
        if (this.sticks.length > 0) {
          this.offset = this.sticks.offset().top;
          if (window.innerWidth > 600) {
            this.check_scroll();
            $(window).on("scroll", this.check_scroll.bind(this));
          }
        }
        return this;
      }

      filter_tag(e) {
        var filter, i, len, ref, results;
        if (e.currentTarget.checked) {
          this.filters.push(e.currentTarget.value);
          this.$el.find(".product." + e.currentTarget.value).first().velocity("scroll", {
            duration: 1666,
            easing: "easeOutQuart",
            offset: -80
          });
        } else {
          this.filters = _.without(this.filters, e.currentTarget.value);
        }
        if (this.filters.length) {
          this.$el.find(".product").addClass("product--disabled");
          ref = this.filters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            filter = ref[i];
            results.push(this.$el.find(".product." + filter).removeClass("product--disabled").addClass("product--highlight"));
          }
          return results;
        } else {
          return this.$el.find(".product").removeClass("product--disabled").removeClass("product--highlight");
        }
      }

      scroll_to(e) {
        var scroll_to;
        scroll_to = $("#" + e.currentTarget.getAttribute("data-scroll-to"));
        if (scroll_to.length > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return scroll_to.velocity("scroll", {
            duration: 1666,
            easing: "easeOutQuart",
            offset: -80
          });
        }
      }

      check_scroll(e) {
        if (window.pageYOffset > this.offset - 100) {
          if (!this.sticks.hasClass("sticks--fixed")) {
            return this.sticks.addClass("sticks--fixed");
          }
        } else {
          if (this.sticks.hasClass("sticks--fixed")) {
            return this.sticks.removeClass("sticks--fixed");
          }
        }
      }

      undelegateEvents() {
        $(window).off("scroll", this.check_scroll);
        return super.undelegateEvents();
      }

    };

    Collection.prototype.events = {
      "click [data-filter-tag]": "filter_tag",
      "click [data-scroll-to]": "scroll_to"
    };

    Collection.prototype.filters = [];

    return Collection;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.CountrySelector = (function() {
    class CountrySelector extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        var country;
        if (Lover.cookies.get("countries_hidden") == null) {
          country = this.$el.attr("data-country");
          $.ajax("https://bombombaby.com/ipcheck", {
            method: "GET",
            dataType: "json",
            success: (response) => {
              console.log(response);
              if (country === 'CA' && response.coutry_code !== 'CA') {
                return this.show();
              } else {
                if (response.coutry_code === 'CA') {
                  return this.show();
                }
              }
            }
          });
        }
        return this;
      }

      toggle(e) {
        if (this.$el.hasClass("newsletter--show")) {
          return this.hide(e);
        } else {
          return this.show(e);
        }
      }

      show(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.addClass("newsletter--show");
      }

      // this.$el.find("[type='email']").focus()
      hide(e) {
        if (e != null) {
          e.preventDefault();
        }
        this.$el.removeClass("newsletter--show");
        return Lover.cookies.set("countries_hidden", true);
      }

    };

    CountrySelector.prototype.el = $("#countries");

    CountrySelector.prototype.data = {};

    CountrySelector.prototype.events = {
      "click [data-hide]": "hide"
    };

    return CountrySelector;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Feed = (function() {
    class Feed extends Backbone.View {
      initialize() {
        this.feed = new Lover.Collections.Feed({
          user_id: this.$el.attr("data-feed-user-id"),
          access_token: this.$el.attr("data-feed-access-token"),
          limit: this.$el.attr("data-feed-limit")
        });
        this.listenTo(this.feed, "sync", this.render);
        this.width = this.$el.attr("data-feed-photo-width") + "%";
        return this.render();
      }

      render() {
        _.extend(this.data, {
          feed: this.feed.toJSON(),
          width: this.width
        });
        this.$el.html(this.template(this.data));
        return this;
      }

    };

    Feed.prototype.template = templates["feed"];

    Feed.prototype.data = {};

    Feed.prototype.events = {};

    return Feed;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Filters = (function() {
    class Filters extends Lover.Views.Nav {
      initialize() {
        return super.initialize();
      }

      render() {
        return super.render();
      }

    };

    Filters.prototype.events = {};

    return Filters;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Header = (function() {
    class Header extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        return this;
      }

      // check_scroll: (e)->
      // 	if window.pageYOffset > 0
      // 		this.$el.addClass "header--scrolled" unless this.$el.hasClass "header--scrolled"
      // 	else
      // 		this.$el.removeClass "header--scrolled" if this.$el.hasClass "header--scrolled"
      undelegateEvents() {
        // $(window).off("scroll", this.check_scroll)
        return super.undelegateEvents();
      }

      toggle_cart(e) {
        e.preventDefault();
        $(e.currentTarget).blur();
        return Lover.cart_view.toggle();
      }

      close_alert(e) {
        e.preventDefault();
        return this.$el.find("[data-header-alert]").addClass("fade_out");
      }

      toggle_sub(e) {
        console.log(e.currentTarget);
        return this.$el.find("[data-sub='" + $(e.currentTarget).attr("data-toggle-sub") + "']").toggleClass("header__sub--show");
      }

      show_sub(e) {
        return this.$el.find("[data-sub='" + $(e.currentTarget).attr("data-show-sub") + "']").addClass("header__sub--show");
      }

      hide_sub(e) {
        return this.$el.find("[data-sub]").removeClass("header__sub--show");
      }

    };

    Header.prototype.events = {
      "click [data-close-alert]": "close_alert",
      "click [data-toggle-cart]": "toggle_cart",
      "mouseenter [data-show-sub]": "show_sub",
      "mouseleave [data-sub]": "hide_sub",
      "click [data-toggle-sub]": "toggle_sub"
    };

    return Header;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Login = (function() {
    class Login extends Lover.Views.Slider {
      initialize() {
        return super.initialize();
      }

      render() {
        return super.render();
      }

      customer_login(e) {
        e.preventDefault();
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return $.ajax(e.currentTarget.getAttribute("action"), {
          method: "POST",
          dataType: "html",
          data: {
            "customer[email]": e.currentTarget["customer[email]"].value,
            "customer[password]": e.currentTarget["customer[password]"].value,
            form_type: "customer_login",
            utf8: "✓"
          },
          success: (response) => {
            var errors;
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              Turbolinks.visit("/account");
              return this.hide();
            }
          }
        });
      }

      create_customer(e) {
        e.preventDefault();
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return $.ajax(e.currentTarget.getAttribute("action"), {
          method: "POST",
          data: {
            "customer[email]": e.currentTarget["customer[email]"].value,
            "customer[password]": e.currentTarget["customer[password]"].value,
            "customer[first_name]": e.currentTarget["customer[first_name]"].value,
            "customer[last_name]": e.currentTarget["customer[last_name]"].value,
            form_type: "create_customer",
            utf8: "✓"
          },
          success: (response) => {
            var errors;
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              Turbolinks.visit("/account");
              return this.hide();
            }
          }
        });
      }

      toggle(e) {
        if (this.$el.hasClass("overlay--show")) {
          return this.hide(e);
        } else {
          return this.show(e);
        }
      }

      show(e, index = 0) {
        if (e != null) {
          e.preventDefault();
        }
        this.$el.find("#login_email").focus();
        return this.$el.addClass("overlay--show");
      }

      hide(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.removeClass("overlay--show");
      }

    };

    Login.prototype.el = $("#login");

    Login.prototype.data = {};

    Login.prototype.events = {
      "click [data-hide]": "hide",
      "submit #customer_login": "customer_login",
      "submit #create_customer": "create_customer",
      "click [data-submit]": "submit_form",
      "click [data-slide-marker]": "slide_to"
    };

    return Login;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Newsletter = (function() {
    class Newsletter extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        var delay;
        if (Lover.cookies.get("newsletter_hidden") == null) {
          delay = this.$el.attr("data-newsletter-delay");
          if (delay !== "never") {
            setTimeout(() => {
              return this.show();
            }, this.$el.attr("data-newsletter-delay") * 1000);
          }
        }
        return this;
      }

      toggle(e) {
        if (this.$el.hasClass("newsletter--show")) {
          return this.hide(e);
        } else {
          return this.show(e);
        }
      }

      show(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.addClass("newsletter--show");
      }

      // this.$el.find("[type='email']").focus()
      hide(e) {
        if (e != null) {
          e.preventDefault();
        }
        this.$el.removeClass("newsletter--show");
        return Lover.cookies.set("newsletter_hidden", true);
      }

    };

    Newsletter.prototype.el = $("#newsletter");

    Newsletter.prototype.data = {};

    Newsletter.prototype.events = {
      "click [data-hide]": "hide"
    };

    return Newsletter;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Product = (function() {
    class Product extends Backbone.View {
      initialize() {
        console.log("Product: " + this.$el.attr("data-product-id"));
        return this.render();
      }

      render() {
        this.$el.find("[name='name']").focus();
        this.style = this.$el.find("[name='style']").val();
        this.$el.addClass("product--" + this.style);
        this.position = this.$el.find("[name='position']").val();
        this.$el.addClass("product--" + this.position);
        return this;
      }

      input_name(e) {
        return this.$el.find("[data-custom-text]").text(e.currentTarget.value);
      }

      change_style(e) {
        this.$el.removeClass("product--" + this.style);
        this.style = e.currentTarget.value;
        return this.$el.addClass("product--" + this.style);
      }

      change_position(e) {
        this.$el.removeClass("product--" + this.position);
        this.position = e.currentTarget.value;
        return this.$el.addClass("product--" + this.position);
      }

      change_variant(e) {
        var id;
        id = e.currentTarget.value;
        if (id != null) {
          return Turbolinks.visit(window.location.pathname + "?variant=" + id);
        } else {
          return Turbolinks.visit(window.location.pathname);
        }
      }

      show_image(e) {
        var image;
        e.preventDefault();
        image = this.$el.find("[data-featured-image]");
        image.attr("src", $(e.currentTarget).attr("href"));
        this.$el.find("[data-featured-alt]").text($(e.currentTarget).find("img").attr("alt"));
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return image.on("load", () => {
          Turbolinks.controller.adapter.progressBar.setValue(100);
          return Turbolinks.controller.adapter.progressBar.hide();
        });
      }

      add_to_cart(e, data = {}) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.currentTarget["name"]) {
          data["properties[Name]"] = e.currentTarget["name"].value;
          data["properties[Style]"] = e.currentTarget["style"].value;
          data["properties[Position]"] = e.currentTarget["position"].value;
        }
        Lover.cart.add(this.$el.find("[name='size']").val(), 1, data);
        return Lover.cart_view.show();
      }

    };

    Product.prototype.events = {
      "input [name='name']": "input_name",
      "click [name='shirt']": "change_variant",
      "click [name='colour']": "change_variant",
      "click [data-thumbnail]": "show_image",
      "submit [data-add-to-cart-form]": "add_to_cart",
      "change [name='style']": "change_style",
      "change [name='position']": "change_position"
    };

    return Product;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.CustomProduct = (function() {
    class CustomProduct extends Lover.Views.Product {
      initialize() {
        super.initialize();
        return console.log("Custom!");
      }

      render() {
        var i, index, len, product, ref;
        this.size = parseInt(this.$el.attr("data-custom-size"));
        if (this.size < this.products.length) {
          this.products = this.products.slice(0, this.size);
        }
        this.spots = this.$el.find("[data-product-spot]");
        this.spots.attr("data-product-spot", "");
        this.spots.attr("src", "");
        ref = this.products;
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          product = ref[index];
          this.spots[index].setAttribute("data-product-spot", product.title);
          this.spots[index].setAttribute("src", product.image);
        }
        this.$el.find("[data-add-to-cart]").attr("disabled", this.products.length !== this.size);
        return super.render();
      }

      add_to_cart(e, data = {}) {
        var i, len, product, products_text, ref;
        products_text = "";
        ref = this.products;
        for (i = 0, len = ref.length; i < len; i++) {
          product = ref[i];
          products_text += product.title + ", ";
        }
        data["properties[" + this.$el.attr("data-custom-label") + "]"] = products_text.substring(0, products_text.length - 2);
        return super.add_to_cart(e, data);
      }

      add_product(e) {
        e.preventDefault();
        if (this.products.length < this.size) {
          this.products.push({
            title: e.currentTarget.getAttribute("data-add-product"),
            image: e.currentTarget.getAttribute("data-add-product-image")
          });
          return this.render();
        }
      }

      remove_product(e) {
        e.preventDefault();
        this.products.splice(this.spots.index(e.currentTarget), 1);
        return this.render();
      }

    };

    CustomProduct.prototype.events = {
      "click [name='variant']": "change_variant",
      "click [data-add-product]": "add_product",
      "click [data-add-to-cart]": "add_to_cart",
      "click [data-product-spot]": "remove_product"
    };

    CustomProduct.prototype.products = [];

    CustomProduct.prototype.size = 0;

    return CustomProduct;

  }).call(this);

}).call(this);

(function() {
  Lover.Views.Search = (function() {
    class Search extends Backbone.View {
      initialize() {
        return this.render();
      }

      render() {
        return this;
      }

      toggle(e) {
        if (this.$el.hasClass("overlay--show")) {
          return this.hide(e);
        } else {
          return this.show(e);
        }
      }

      show(e) {
        if (e != null) {
          e.preventDefault();
        }
        this.$el.addClass("overlay--show");
        return this.$el.find("[type='search']").focus();
      }

      hide(e) {
        if (e != null) {
          e.preventDefault();
        }
        return this.$el.removeClass("overlay--show");
      }

    };

    Search.prototype.el = $("#search");

    Search.prototype.data = {};

    Search.prototype.events = {
      "click [data-hide]": "hide"
    };

    return Search;

  }).call(this);

}).call(this);
