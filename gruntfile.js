/**
 * Author: Steven Dunn
 * Date Created: April 15, 2017
 **/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    update: true // Only update changed files
                },
                files: [{
                    expand: true,
                    cwd: 'content/sass',
                    src: ['**/*.scss'],
                    dest: 'content/sass/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'src/sass/css/*.css',
                        'src/scripts/*.js',
                        'index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './',
                    notify: false //Remove the "Connected to BrowserSync" message that shows up in the top right
                }
            }
        }
    });

    // Load grunt modules
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Run the default "grunt" task to:
    //    1. Watch and compile scss files as they change
    //    2. Run BrowserSync to update the browser when css and js files are changed
    grunt.registerTask('default', ['browserSync', 'watch']);

    //When running the application, use "npm start" to use express server instead of BrowserSync.
    //Routing with a forward slash (e.g. "/cart" or "/billing") won't work with BrowserSync.
};