Blog.PortfolioView = Ember.View.extend({
    isExpanded: false,
    classNameBindings: ['isExpanded', 'readMore'],
    click: function() {
        this.toggleProperty('isExpanded');
    },
    readMore: Ember.computed.gt('length', 140)
});