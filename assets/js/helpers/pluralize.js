Ember.Handlebars.registerBoundHelper( 'pluralize', function( number, options ) {
    var phraseMatch = ( options.hash.phrase || '{|s}' ).match( /(.*?)\{(.*?)\|(.*?)\}/),
        word = phraseMatch[ 1 ],
        singular = word + phraseMatch[ 2 ],
        plural = word + phraseMatch[ 3 ]
    return number == 1 ? singular : plural
});