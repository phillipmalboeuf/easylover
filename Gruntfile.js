module.exports = function(grunt) {

  var env_var = grunt.file.readJSON('variables/environment.json');
  // var env_var = grunt.file.readJSON('variables/us.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    shopify: {
      options: {
        api_key: env_var.shopify.api_key,
        password: env_var.shopify.password,
        url: "to-be-decided-f-ck.myshopify.com",
        theme: "31979831394",
        // url: "easy-lover-club.myshopify.com",
        // theme: "46751875151",
        base: "theme/",
        disable_growl_notifications: true
      }
    },


    handlebars: {
      compile: {
        options: {
          namespace: "templates",
          processName: function(filePath) {
            var name = "";
            filePath = filePath.split(".");
            filePath = filePath[0].split("/");
            name += filePath[2];
            for (var i = 3; i < filePath.length; i++) {
                name += "/" + filePath[i];
            };
            return name;
          }
        },
        files: {
          "theme/assets/templates.js": ["src/templates/**/*.hbs"]
        }
      }
    },


    sass: {
      options: {
        outputStyle: 'compressed'
      },
      compile: {
        files: {
            'theme/assets/all.css': 'src/scss/all.scss',
        }
      }
    },

    
    coffee: {
      shop: {
        files: {
          'theme/assets/app.js': [
            'src/coffee/app.coffee',
            'src/coffee/core/**/*.coffee',
            'src/coffee/models/**/*.coffee',
            'src/coffee/collections/**/*.coffee',
            'src/coffee/views/**/*.coffee',
            'src/coffee/routers/router.coffee']
        }
      }
    },


    open: {
      start: {
        path: 'https://to-be-decided-f-ck.myshopify.com/?preview_theme_id=31979831394',
        app: 'Google Chrome'
      }
    },


    watch: {
      shopify: {
        files: ["theme/**"],
        tasks: ["shopify"],
        options: {
          livereload: {
            host: 'localhost',
            port: 9000,
            key: grunt.file.read('keys/livereload.key'),
            cert: grunt.file.read('keys/livereload.crt')
          }
        }
      },
      handlebars: {
        files: 'src/templates/**/*.hbs',
        tasks: ['handlebars'],
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
      },
      coffee: {
        files: 'src/coffee/**/*.coffee',
        tasks: ['coffee'],
      }
    }


  });


  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');



  grunt.registerTask('default', ['handlebars', 'sass', 'coffee', 'open', 'watch']);

};



