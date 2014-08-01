Blog.PostController = Ember.ObjectController.extend(Blog.CheckAccessMixin, {
    comments: function () {
        return this.get('model.comments')
    }.property('model.@each.comments'),
    post: function () {
        return this.get('model');
    }.property('post'),
    user: function () {
        return this.get('user');
    }.property('user'),
    actions: {
        editPost: function (post) {
            var _this = this;
            post.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
                post.rollback();
            })
        },
        leaveComment: function () {
            var controller = this, user = controller.get('user'), post = controller.get('post');
            var comment = this.get('store').createRecord('comment', {
                text: controller.get('commentText'),
                user: user,
                post: post,
                postedAt: new Date()
            });
            comment.save().then(function (comment_res) {
                var comments = controller.get("comments");
                comments.pushObject(comment_res);
                post.save().then(function (post_res) {
                    controller.set("commentText", "");
                }, function (err) {
                    comments.popObject();
                    controller.woof.danger(err.responseText);
                });
            }, function (err) {
                comment.rollback();
                controller.woof.danger(err.responseText);
            });
        },
        editComment: function (comment) {
            var _this = this;
            comment.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
            });
        },
        deleteComment: function (comment) {
            var _this = this;
            comment.destroyRecord().then(function (data) {
                _this.get('post').save().then(function () {}, function (err) {
                    post.rollback();
                    _this.woof.danger(err.responseText);
                })
            }, function (err) {
                comment.rollback();
                _this.woof.danger(err.responseText);
            })
        }
    }
});

