//Blog.ExtractSingleMixin = Ember.Mixin.extend({
//    extractSingle: function (store, type, payload, id) {
//        var items = payload.post.items,
//            commentIds = items.mapBy('id');
//
//        payload.items = items;
//        payload.post.items = commentIds;
//
//        return this._super.apply(this, arguments);
//    }
//});