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
      this.newsletter_view = new Lover.Views.Newsletter();
      this.views = [];
      this.render_views();
      document.addEventListener("turbolinks:load", (function(_this) {
        return function() {
          return _this.render_views();
        };
      })(this));
      return window.onpopstate = function(e) {
        return Turbolinks.visit(window.location.pathname + window.location.search, {
          action: "replace"
        });
      };
    },
    render_views: function() {
      var i, len, ref, view;
      ref = this.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.undelegateEvents();
      }
      delete this.views;
      this.views = [];
      $("[data-navigation]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Nav({
            el: element
          }));
        };
      })(this));
      $("[data-header]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Header({
            el: element
          }));
        };
      })(this));
      $("[data-filters]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Filters({
            el: element
          }));
        };
      })(this));
      $("[data-slider]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Slider({
            el: element
          }));
        };
      })(this));
      $("[data-feed]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Feed({
            el: element
          }));
        };
      })(this));
      $("[data-map]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Map({
            el: element
          }));
        };
      })(this));
      $("[data-product-id]").each((function(_this) {
        return function(index, element) {
          if (element.hasAttribute("data-custom-size")) {
            return _this.views.push(new Lover.Views.CustomProduct({
              el: element
            }));
          } else {
            return _this.views.push(new Lover.Views.Product({
              el: element
            }));
          }
        };
      })(this));
      $("[data-collection-id]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Lover.Views.Collection({
            el: element
          }));
        };
      })(this));
      if ($("[data-show-cart]").length > 0) {
        this.cart_view.show();
      }
      if ($("[data-show-search]").length > 0) {
        return this.search_view.show();
      }
    }
  };

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
      var cookie, cookies, fn, i, len, value;
      name = "X-" + name + "=";
      value = false;
      cookies = document.cookie.split(';');
      fn = function(cookie) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
          return value = cookie.substring(name.length, cookie.length);
        }
      };
      for (i = 0, len = cookies.length; i < len; i++) {
        cookie = cookies[i];
        fn(cookie);
      }
      if (!value) {
        value = null;
      }
      return value;
    },
    "delete": function(name) {
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
      return (parseFloat(value) / 100) + " CAD";
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
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Models.Cart = (function(superClass) {
    extend(Cart, superClass);

    function Cart() {
      return Cart.__super__.constructor.apply(this, arguments);
    }

    Cart.prototype.url = "/cart.js";

    Cart.prototype.parse = function(response) {
      return response;
    };

    Cart.prototype.initialize = function() {
      return this.fetch();
    };

    Cart.prototype.add = function(id, quantity, data) {
      if (quantity == null) {
        quantity = 1;
      }
      if (data == null) {
        data = {};
      }
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
      data["id"] = id;
      data["quantity"] = quantity;
      return $.ajax("/cart/add.js", {
        method: "POST",
        dataType: "json",
        data: data,
        success: (function(_this) {
          return function(response) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return _this.fetch();
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return Lover.cart_view.show_error(response.responseJSON.description);
          };
        })(this)
      });
    };

    Cart.prototype.change = function(key, quantity) {
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
        success: (function(_this) {
          return function(response) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return _this.fetch();
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            console.log(response);
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return Lover.cart_view.show_error(response.responseJSON.description);
          };
        })(this)
      });
    };

    Cart.prototype.remove = function(key) {
      return this.change(key, 0);
    };

    return Cart;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Collections.Feed = (function(superClass) {
    extend(Feed, superClass);

    function Feed() {
      return Feed.__super__.constructor.apply(this, arguments);
    }

    Feed.prototype.parse = function(response) {
      return response.data;
    };

    Feed.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      this.url = "https://api.instagram.com/v1/users/" + options.user_id + "/media/recent?access_token=" + options.access_token + "&count=" + options.limit;
      return this.fetch({
        success: function(model, response) {}
      });
    };

    Feed.prototype.sync = function(method, collection, options) {
      var params;
      params = _.extend(options, {
        type: 'GET',
        dataType: 'jsonp',
        url: collection.url,
        processData: false
      });
      return $.ajax(params);
    };

    return Feed;

  })(Backbone.Collection);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Slider = (function(superClass) {
    extend(Slider, superClass);

    function Slider() {
      return Slider.__super__.constructor.apply(this, arguments);
    }

    Slider.prototype.current_slide = 0;

    Slider.prototype.events = {
      "click [data-next-slide-button]": "next_slide",
      "click [data-previous-slide-button]": "previous_slide",
      "click [data-slide-marker]": "slide_to"
    };

    Slider.prototype.initialize = function() {
      this.slides_count = this.$el.find("[data-slide]").length;
      return this.render();
    };

    Slider.prototype.render = function() {
      this.$el.find("[data-slide=" + this.current_slide + "]").css("opacity", 1);
      this.reset_autoplay();
      return this;
    };

    Slider.prototype.next_slide = function(e) {
      if (this.current_slide === this.slides_count - 1) {
        return this.slide_to(e, 0);
      } else {
        return this.slide_to(e, this.current_slide + 1);
      }
    };

    Slider.prototype.previous_slide = function(e) {
      if (this.current_slide === 0) {
        return this.slide_to(e, this.slides_count - 1);
      } else {
        return this.slide_to(e, this.current_slide - 1);
      }
    };

    Slider.prototype.slide_to = function(e, index) {
      if (e != null) {
        e.preventDefault();
        e.currentTarget.blur();
        this.reset_autoplay();
      }
      this.current_slide = index;
      this.$el.find("[data-slide-marker]").removeClass("slider__marker--active");
      this.$el.find("[data-slide-marker=" + this.current_slide + "]").addClass("slider__marker--active");
      this.$el.find("[data-slide]").css("opacity", 0.3);
      this.$el.find("[data-slide]").css("transform", "translateX(-" + this.current_slide + "00%)");
      return this.$el.find("[data-slide=" + this.current_slide + "]").css("opacity", 1);
    };

    Slider.prototype.reset_autoplay = function() {
      if (this.el.hasAttribute("data-slider-autoplay")) {
        if (this.interval != null) {
          window.clearInterval(this.interval);
        }
        return this.interval = window.setInterval((function(_this) {
          return function() {
            return _this.next_slide();
          };
        })(this), this.$el.attr("data-slider-autoplay"));
      }
    };

    return Slider;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Nav = (function(superClass) {
    extend(Nav, superClass);

    function Nav() {
      return Nav.__super__.constructor.apply(this, arguments);
    }

    Nav.prototype.events = {
      "click [data-toggle-cart]": "toggle_cart",
      "click [data-toggle-search]": "toggle_search",
      "click [data-toggle-login]": "toggle_login",
      "click [data-toggle-account]": "toggle_account",
      "click [data-toggle-burger]": "toggle_burger"
    };

    Nav.prototype.initialize = function() {
      return this.render();
    };

    Nav.prototype.render = function() {
      this.$el.find("[data-sub]").each(function(index, sub) {
        var prev;
        prev = $(sub).prev();
        if (prev.length > 0) {
          if (sub.getAttribute("data-sub") === "right") {
            $(sub).css("left", prev.offset().left - $(sub).width() + prev.width() - 25);
          } else {
            $(sub).css("left", prev.offset().left + 25);
          }
          return $(sub).css("top", prev.offset().top + prev.height() + 10);
        }
      });
      return this;
    };

    Nav.prototype.toggle_cart = function(e) {
      e.preventDefault();
      $(e.currentTarget).blur();
      return Lover.cart_view.toggle();
    };

    Nav.prototype.toggle_search = function(e) {
      e.preventDefault();
      $(e.currentTarget).blur();
      return Lover.search_view.toggle();
    };

    Nav.prototype.toggle_login = function(e) {
      e.preventDefault();
      $(e.currentTarget).blur();
      return Lover.login_view.toggle();
    };

    Nav.prototype.toggle_account = function(e) {
      e.preventDefault();
      $(e.currentTarget).blur();
      return Lover.account_view.toggle();
    };

    Nav.prototype.toggle_burger = function(e) {
      $(e.currentTarget).blur();
      if ($("body").hasClass("has_burger")) {
        return this.hide_burger(e);
      } else {
        return this.show_burger(e);
      }
    };

    Nav.prototype.show_burger = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $("body").addClass("has_burger");
      return $(".main").on("click", (function(_this) {
        return function() {
          return _this.hide_burger();
        };
      })(this));
    };

    Nav.prototype.hide_burger = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $("body").removeClass("has_burger");
      return $(".main").off("click");
    };

    return Nav;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Cart = (function(superClass) {
    extend(Cart, superClass);

    function Cart() {
      return Cart.__super__.constructor.apply(this, arguments);
    }

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

    Cart.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.render);
      return this.render();
    };

    Cart.prototype.render = function() {
      _.extend(this.data, {
        model: this.model.toJSON(),
        text: window.cart_text
      });
      this.$el.html(this.template(this.data));
      $("[data-item-count]").text(this.model.get("item_count"));
      if (this.model.get("item_count") != null) {
        if (this.model.get("item_count") > 0) {
          $("[data-toggle-cart]").addClass("nav__link--active");
        } else {
          $("[data-toggle-cart]").removeClass("nav__link--active");
        }
      }
      return this;
    };

    Cart.prototype.toggle = function(e) {
      if (this.$el.hasClass("overlay--show")) {
        return this.hide(e);
      } else {
        return this.show(e);
      }
    };

    Cart.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.addClass("overlay--show");
    };

    Cart.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.removeClass("overlay--show");
    };

    Cart.prototype.remove_from_cart = function(e) {
      e.preventDefault();
      return Lover.cart.remove($(e.currentTarget).attr("data-remove-from-cart"));
    };

    Cart.prototype.increment = function(e) {
      e.preventDefault();
      return Lover.cart.change($(e.currentTarget).attr("data-increment"), parseInt($(e.currentTarget).attr("data-current-quantity")) + 1);
    };

    Cart.prototype.decrement = function(e) {
      e.preventDefault();
      return Lover.cart.change($(e.currentTarget).attr("data-decrement"), parseInt($(e.currentTarget).attr("data-current-quantity")) - 1);
    };

    Cart.prototype.show_error = function(error) {
      this.$el.find("[data-cart-error-text]").text(error);
      return this.$el.find("[data-cart-error]").removeClass("fade_out");
    };

    Cart.prototype.close_error = function(e) {
      e.preventDefault();
      return this.$el.find("[data-cart-error]").addClass("fade_out");
    };

    return Cart;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.events = {
      "click [data-filter-tag]": "filter_tag",
      "click [data-scroll-to]": "scroll_to"
    };

    Collection.prototype.filters = [];

    Collection.prototype.initialize = function() {
      console.log("Collection: " + this.$el.attr("data-collection-id"));
      return this.render();
    };

    Collection.prototype.render = function() {
      this.sticks = this.$el.find("[data-sticks]");
      if (this.sticks.length > 0) {
        this.offset = this.sticks.offset().top;
        if (window.innerWidth > 600) {
          this.check_scroll();
          $(window).on("scroll", this.check_scroll.bind(this));
        }
      }
      return this;
    };

    Collection.prototype.filter_tag = function(e) {
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
    };

    Collection.prototype.scroll_to = function(e) {
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
    };

    Collection.prototype.check_scroll = function(e) {
      if (window.pageYOffset > this.offset - 100) {
        if (!this.sticks.hasClass("sticks--fixed")) {
          return this.sticks.addClass("sticks--fixed");
        }
      } else {
        if (this.sticks.hasClass("sticks--fixed")) {
          return this.sticks.removeClass("sticks--fixed");
        }
      }
    };

    Collection.prototype.undelegateEvents = function() {
      $(window).off("scroll", this.check_scroll);
      return Collection.__super__.undelegateEvents.call(this);
    };

    return Collection;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Feed = (function(superClass) {
    extend(Feed, superClass);

    function Feed() {
      return Feed.__super__.constructor.apply(this, arguments);
    }

    Feed.prototype.template = templates["feed"];

    Feed.prototype.data = {};

    Feed.prototype.events = {};

    Feed.prototype.initialize = function() {
      this.feed = new Lover.Collections.Feed({
        user_id: this.$el.attr("data-feed-user-id"),
        access_token: this.$el.attr("data-feed-access-token"),
        limit: this.$el.attr("data-feed-limit")
      });
      this.listenTo(this.feed, "sync", this.render);
      this.width = this.$el.attr("data-feed-photo-width") + "%";
      return this.render();
    };

    Feed.prototype.render = function() {
      _.extend(this.data, {
        feed: this.feed.toJSON(),
        width: this.width
      });
      this.$el.html(this.template(this.data));
      return this;
    };

    return Feed;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Filters = (function(superClass) {
    extend(Filters, superClass);

    function Filters() {
      return Filters.__super__.constructor.apply(this, arguments);
    }

    Filters.prototype.events = {};

    Filters.prototype.initialize = function() {
      return Filters.__super__.initialize.call(this);
    };

    Filters.prototype.render = function() {
      return Filters.__super__.render.call(this);
    };

    return Filters;

  })(Lover.Views.Nav);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Header = (function(superClass) {
    extend(Header, superClass);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.events = {
      "click [data-close-alert]": "close_alert"
    };

    Header.prototype.initialize = function() {
      return this.render();
    };

    Header.prototype.render = function() {
      this.check_scroll();
      $(window).on("scroll", this.check_scroll.bind(this));
      return this;
    };

    Header.prototype.check_scroll = function(e) {
      if (window.pageYOffset > 0) {
        if (!this.$el.hasClass("header--scrolled")) {
          return this.$el.addClass("header--scrolled");
        }
      } else {
        if (this.$el.hasClass("header--scrolled")) {
          return this.$el.removeClass("header--scrolled");
        }
      }
    };

    Header.prototype.close_alert = function(e) {
      e.preventDefault();
      return this.$el.find("[data-header-alert]").addClass("fade_out");
    };

    Header.prototype.undelegateEvents = function() {
      $(window).off("scroll", this.check_scroll);
      return Header.__super__.undelegateEvents.call(this);
    };

    return Header;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Login = (function(superClass) {
    extend(Login, superClass);

    function Login() {
      return Login.__super__.constructor.apply(this, arguments);
    }

    Login.prototype.el = $("#login");

    Login.prototype.data = {};

    Login.prototype.events = {
      "click [data-hide]": "hide",
      "submit #customer_login": "customer_login",
      "submit #create_customer": "create_customer",
      "click [data-submit]": "submit_form",
      "click [data-slide-marker]": "slide_to"
    };

    Login.prototype.initialize = function() {
      return Login.__super__.initialize.call(this);
    };

    Login.prototype.render = function() {
      return Login.__super__.render.call(this);
    };

    Login.prototype.customer_login = function(e) {
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
        success: (function(_this) {
          return function(response) {
            var errors;
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              Turbolinks.visit("/account");
              return _this.hide();
            }
          };
        })(this)
      });
    };

    Login.prototype.create_customer = function(e) {
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
        success: (function(_this) {
          return function(response) {
            var errors;
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              Turbolinks.visit("/account");
              return _this.hide();
            }
          };
        })(this)
      });
    };

    Login.prototype.toggle = function(e) {
      if (this.$el.hasClass("overlay--show")) {
        return this.hide(e);
      } else {
        return this.show(e);
      }
    };

    Login.prototype.show = function(e, index) {
      if (index == null) {
        index = 0;
      }
      if (e != null) {
        e.preventDefault();
      }
      this.$el.find("#login_email").focus();
      return this.$el.addClass("overlay--show");
    };

    Login.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.removeClass("overlay--show");
    };

    return Login;

  })(Lover.Views.Slider);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Newsletter = (function(superClass) {
    extend(Newsletter, superClass);

    function Newsletter() {
      return Newsletter.__super__.constructor.apply(this, arguments);
    }

    Newsletter.prototype.el = $("#newsletter");

    Newsletter.prototype.data = {};

    Newsletter.prototype.events = {
      "click [data-hide]": "hide"
    };

    Newsletter.prototype.initialize = function() {
      return this.render();
    };

    Newsletter.prototype.render = function() {
      var delay;
      if (Lover.cookies.get("newsletter_hidden") == null) {
        delay = this.$el.attr("data-newsletter-delay");
        if (delay !== "never") {
          setTimeout((function(_this) {
            return function() {
              return _this.show();
            };
          })(this), this.$el.attr("data-newsletter-delay") * 1000);
        }
      }
      return this;
    };

    Newsletter.prototype.toggle = function(e) {
      if (this.$el.hasClass("newsletter--show")) {
        return this.hide(e);
      } else {
        return this.show(e);
      }
    };

    Newsletter.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.addClass("newsletter--show");
    };

    Newsletter.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      this.$el.removeClass("newsletter--show");
      return Lover.cookies.set("newsletter_hidden", true);
    };

    return Newsletter;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Product = (function(superClass) {
    extend(Product, superClass);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.events = {
      "input [name='name']": "input_name",
      "click [name='shirt']": "change_variant",
      "click [name='colour']": "change_variant",
      "click [data-thumbnail]": "show_image",
      "submit [data-add-to-cart-form]": "add_to_cart",
      "change [name='style']": "change_style",
      "change [name='position']": "change_position"
    };

    Product.prototype.initialize = function() {
      console.log("Product: " + this.$el.attr("data-product-id"));
      return this.render();
    };

    Product.prototype.render = function() {
      this.$el.find("[name='name']").focus();
      this.style = this.$el.find("[name='style']").val();
      this.$el.addClass("product--" + this.style);
      this.position = this.$el.find("[name='position']").val();
      this.$el.addClass("product--" + this.position);
      return this;
    };

    Product.prototype.input_name = function(e) {
      return this.$el.find("[data-custom-text]").text(e.currentTarget.value);
    };

    Product.prototype.change_style = function(e) {
      this.$el.removeClass("product--" + this.style);
      this.style = e.currentTarget.value;
      return this.$el.addClass("product--" + this.style);
    };

    Product.prototype.change_position = function(e) {
      this.$el.removeClass("product--" + this.position);
      this.position = e.currentTarget.value;
      return this.$el.addClass("product--" + this.position);
    };

    Product.prototype.change_variant = function(e) {
      var id;
      id = e.currentTarget.value;
      if (id != null) {
        return Turbolinks.visit(window.location.pathname + "?variant=" + id);
      } else {
        return Turbolinks.visit(window.location.pathname);
      }
    };

    Product.prototype.show_image = function(e) {
      var image;
      e.preventDefault();
      image = this.$el.find("[data-featured-image]");
      image.attr("src", $(e.currentTarget).attr("href"));
      this.$el.find("[data-featured-alt]").text($(e.currentTarget).find("img").attr("alt"));
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
      return image.on("load", (function(_this) {
        return function() {
          Turbolinks.controller.adapter.progressBar.setValue(100);
          return Turbolinks.controller.adapter.progressBar.hide();
        };
      })(this));
    };

    Product.prototype.add_to_cart = function(e, data) {
      if (data == null) {
        data = {};
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      data["properties[Name]"] = e.currentTarget["name"].value;
      data["properties[Style]"] = e.currentTarget["style"].value;
      data["properties[Position]"] = e.currentTarget["position"].value;
      Lover.cart.add(this.$el.find("[name='size']").val(), 1, data);
      return Lover.cart_view.show();
    };

    return Product;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.CustomProduct = (function(superClass) {
    extend(CustomProduct, superClass);

    function CustomProduct() {
      return CustomProduct.__super__.constructor.apply(this, arguments);
    }

    CustomProduct.prototype.events = {
      "click [name='variant']": "change_variant",
      "click [data-add-product]": "add_product",
      "click [data-add-to-cart]": "add_to_cart",
      "click [data-product-spot]": "remove_product"
    };

    CustomProduct.prototype.products = [];

    CustomProduct.prototype.size = 0;

    CustomProduct.prototype.initialize = function() {
      CustomProduct.__super__.initialize.call(this);
      return console.log("Custom!");
    };

    CustomProduct.prototype.render = function() {
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
      return CustomProduct.__super__.render.call(this);
    };

    CustomProduct.prototype.add_to_cart = function(e, data) {
      var i, len, product, products_text, ref;
      if (data == null) {
        data = {};
      }
      products_text = "";
      ref = this.products;
      for (i = 0, len = ref.length; i < len; i++) {
        product = ref[i];
        products_text += product.title + ", ";
      }
      data["properties[" + this.$el.attr("data-custom-label") + "]"] = products_text.substring(0, products_text.length - 2);
      return CustomProduct.__super__.add_to_cart.call(this, e, data);
    };

    CustomProduct.prototype.add_product = function(e) {
      e.preventDefault();
      if (this.products.length < this.size) {
        this.products.push({
          title: e.currentTarget.getAttribute("data-add-product"),
          image: e.currentTarget.getAttribute("data-add-product-image")
        });
        return this.render();
      }
    };

    CustomProduct.prototype.remove_product = function(e) {
      e.preventDefault();
      this.products.splice(this.spots.index(e.currentTarget), 1);
      return this.render();
    };

    return CustomProduct;

  })(Lover.Views.Product);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Lover.Views.Search = (function(superClass) {
    extend(Search, superClass);

    function Search() {
      return Search.__super__.constructor.apply(this, arguments);
    }

    Search.prototype.el = $("#search");

    Search.prototype.data = {};

    Search.prototype.events = {
      "click [data-hide]": "hide"
    };

    Search.prototype.initialize = function() {
      return this.render();
    };

    Search.prototype.render = function() {
      return this;
    };

    Search.prototype.toggle = function(e) {
      if (this.$el.hasClass("overlay--show")) {
        return this.hide(e);
      } else {
        return this.show(e);
      }
    };

    Search.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      this.$el.addClass("overlay--show");
      return this.$el.find("[type='search']").focus();
    };

    Search.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.removeClass("overlay--show");
    };

    return Search;

  })(Backbone.View);

}).call(this);
