module.exports = function (grunt) {
    grunt.initConfig({
        qunit: {
            files: ['./test/site.html']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.registerTask('test', 'qunit');
};