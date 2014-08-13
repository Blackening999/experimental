//Blog.SocialIconView = Ember.View.extend({
//    tagName: "span",
//    mouseEnter: function (e) {
//        var el = Ember.$(e.target);
//        Ember.run(function () {
//            el.find("i").stop(true, true).delay(200).animate({
//                top: -60
//            }, 'fast', function () {
//                el
//                    .addClass('active')
//                    .css({
//                        top: 120
//                    })
//                    .animate({top: 0})
//            });
//        });
//
//    },
//    mouseLeave: function (e) {
//        var el = Ember.$(e.target);
//        Ember.run(function () {
//            el
//                .find('i')
//                .stop(true, true)
//                .animate({
//                    top: 0
//                })
//                .removeClass('active');
//        });
//
//
//    }
//});