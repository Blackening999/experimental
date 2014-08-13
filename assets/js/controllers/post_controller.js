Blog.PostController = Ember.ObjectController.extend(Blog.CheckAccessMixin, {
    needs: ['application'],
    user: function () {
        return this.get('controllers.application.model')
    }.property('controllers.application.model'),
    authenticated: function () {
        return this.get('controllers.application.userAuthenticated');
    }.property('controllers.application.userAuthenticated'),
    actions: {
        editPost: function (post) {
            var _this = this;
            post.set('postedAt', new Date());
            post.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
                post.rollback();
            })
        },
        leaveComment: function () {
            var controller = this, post = controller.get('model');
            var comment = this.get('store').createRecord('comment', {
                text: controller.get('commentText'),
                postedAt: new Date(),
                user: controller.get('user'),
                post: post
            });
            comment.save().then(function (comment_res) {
                post.get('comments').then(function (comments) {
                    comments.pushObject(comment_res);
                    post.save().then(function (post_res) {
                        controller.set('commentText', '');
                    }, function (err) {
                        comments.popObject();
                        controller.woof.danger(err.responseText);
                    });
                });
            }, function (err) {
                comment.rollback();
                controller.woof.danger(err.responseText);
            });
        },
        editComment: function (comment) {
            var _this = this;
            comment.set('postedAt', new Date());
            comment.save().then(function (data) {}, function (err) {
                _this.woof.danger(err.responseText);
            });
        },
        deleteComment: function (comment) {
            var _this = this;
            comment.destroyRecord().then(function (data) {
                _this.get('model').save().then(function () {}, function (err) {
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

