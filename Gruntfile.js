module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['dist/<%= pkg.name %>']
        }
      }
    },

    browserify: {
      'dist/cpa.js': ['src/main.js'],
      options: {
        bundleOptions: {
          standalone: '<%= pkg.name.replace(".js", "") %>'
        }
      }
    },

    jsdoc: {
      dist: {
        src: ['./src/*.js', './src/utils/*.js', './src/cpa/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    jshint: {
      files: ['src/*.js', 'src/utils/*.js', 'src/cpa/*.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    mocha: {
      test: {
        src: ['test/**/*.html'],
        options: {
          run: true
        }
      }
    },

    watch: {
      files: ['src/*', 'src/utils/*', 'src/cpa/*.js'],
      tasks: ['requirejs', 'jshint', 'uglify', 'mocha']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['browserify', 'jshint', 'uglify']);
};
