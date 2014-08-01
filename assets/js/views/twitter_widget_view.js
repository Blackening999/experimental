//Blog.TwitterWidgetView = Ember.View.extend(Blog.DefaultAnimationMixin, {
//    classNames: ['twitter-widget'],
//    didInsertElement: function () {
//        var tweets = {
//        // Set twitter username, number of tweets & id/class to append tweets
//            user: 'Blackening999',
//            numTweets: 4,
//            appendTo: '.twitter-widget',
//
//            // core function of jqtweet
//            loadTweets: function() {
//                Ember.$.ajax({
//                    url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
//                    type: 'GET',
//                    dataType: 'jsonp',
//                    data: {
//                        screen_name: tweets.user,
//                        include_rts: true,
//                        count: tweets.numTweets,
//                        include_entities: true
//                    },
//                    success: function(data) {
//                        var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
//                        // append tweets into page
//                        for (var i = 0; i < data.length; i++) {
//                            $(tweets.appendTo).append(
//                                html.replace('TWEET_TEXT', tweets.ify.clean(data[i].text) )
//                                    .replace(/USER/g, data[i].user.screen_name)
//                                    .replace('AGO', tweets.timeAgo(data[i].created_at) )
//                                    .replace(/ID/g, data[i].id_str)
//                            );
//                        }
//                    }
//
//                });
//
//            },
//
//
//            /**
//             * The Twitalinkahashifyer!
//             * http://www.dustindiaz.com/basement/ify.html
//             * Eg:
//             * ify.clean('your tweet text');
//             */
//            ify:  {
//                link: function(tweet) {
//                    return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
//                        var http = m2.match(/w/) ? 'http://' : '';
//                        return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
//                    });
//                },
//
//                at: function(tweet) {
//                    return tweet.replace(/\B[@?]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
//                        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
//                    });
//                },
//
//                list: function(tweet) {
//                    return tweet.replace(/\B[@?]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
//                        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
//                    });
//                },
//
//                hash: function(tweet) {
//                    return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
//                        return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
//                    });
//                },
//
//                clean: function(tweet) {
//                    return this.hash(this.at(this.list(this.link(tweet))));
//                }
//            } // ify
//
//
//        };
//        tweets.loadTweets();
//
//    }
//});