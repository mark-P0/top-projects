module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*  Following official examples from:
     *  https://github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          /* Combine all source CSS into a single file */
          'dist/styles.css': 'src/css/*.css',
        },
      },
    },
    /*  https://github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      main: {
        src: 'src/index.html',
        dest: 'dist/index.html',
      },
    },
    /*  https://github.com/gruntjs/grunt-contrib-watch
     */
    watch: {
      src: {
        files: 'src/**',
        tasks: ['build'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['cssmin', 'copy']);
};
