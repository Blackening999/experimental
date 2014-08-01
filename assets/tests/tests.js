// in order to see the app running inside the QUnit runner
Blog.rootElement = '#ember-testing';

// Common test setup
Blog.setupForTesting();
Blog.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
	setup: function () {
		// before each test, ensure the application is ready to run.
		Ember.run(Blog, Blog.advanceReadiness);
	},

	teardown: function () {
		// reset the application state between each test
		Blog.reset();
	}
});

// Home page tests
test("/", function () {
	// async helper telling the application to go to the '/' route
	visit("/");

	// helper waiting the application is idle before running the callback
	andThen(function () {
		equal(find(".nav-collapse.collapse li.active a").text(), "Home", "Application navbar is rendered");
		ok(find(".container .cont-outer"), "Home body is rendered");
		equal(find(".container .portfolio-item:last .header").text(), "Project 6", "Passed info is right");
		equal(find(".portfolio .portfolio-item").length, 6, "All recent home page posts are rendered");
	});
});

//Auth tests
test("/login", function () {
    visit("/login");

    andThen(function() {
        fillIn(find(".controls:eq(0) input"), "aaa");
        fillIn(find(".controls:eq(1) input"), "aaa");

        click(find(".controls:eq(2) > a"));
        andThen(function () {
            equal(find(".nav-collapse.collapse li:eq(4) a").text(), "Logout", "Authentication was successfull");

            // Blog page tests
//            test("/posts", function() {
                visit("/posts");

                andThen(function() {
                    var firstEl = find(".blog-items .blog-item.step:eq(1) .content h4 a");
                    ok(find(".span4.blog-items.first-set"), "Blog page is rendered");
                    equal(firstEl.text(), " New 1 ", "Posts are loaded and rendered");

                    // Second page
                    click(find(".pagination li:not(.sel):last a"));
                    andThen(function() {
                        var anotherEl = find(".blog-items .blog-item.step:eq(1) .content h4 a");
                        equal(anotherEl.text(), " New 9 ", "Pagination is rendered and working");

                        //Blog Post create
                        click(find(".span4.right-side .step.blog-item .btn.btn-success"));
                        andThen(function() {
                            fillIn(find(".blog-content.blog-items .block.step div:eq(0) > input"), "New 10");
                            fillIn(find(".blog-content.blog-items .block.step div:eq(1) > input"), "Description");
                            fillIn(find(".blog-content.blog-items .block.step div:eq(2) > input"), "Category");
                            fillIn(find(".blog-content.blog-items .block.step div:eq(4) > textarea"), "Blog Post number 10");
                            click(find(".blog-content.blog-items .area > a.btn-primary"));

                            andThen(function() {
                                var lastEl = find(".blog-items .blog-item.step:last .content h4 a");
                                equal(lastEl.text(), " New 10 ", "Post created");

                                // Blog Post read
                                click(lastEl);
                                andThen(function() {
                                    equal(find(".cont-outer .header h2").text(), "New 10", "Post is loaded and rendered");

                                    // Blog Post edit
                                    click(find(".cont-outer .header > a.btn-primary"));
                                    andThen(function() {
                                        fillIn(find(".header .edit-state:eq(0)"), "PostTitleHere");
                                        fillIn(find(".header .edit-state:eq(1)"), "PostDescriptionHere");
                                        fillIn(find(".header .edit-state:eq(2)"), "PostCategoryHere");
                                        click(find(".area > a.btn-primary"));
                                        andThen(function() {
                                            equal(find(".cont-outer .header h2").text(), "PostTitleHere", "Post have been edited");

                                            //Blog Post delete
                                            visit('/posts');
                                            andThen(function() {
                                                click(find(".blog-items .blog-item.step:last .action-buttons a"));
                                                andThen(function() {
                                                    equal(find(".blog-items .blog-item.step:last .content h4 a").text(), " New 9 ", "Post have been deleted");
                                                });
                                            });
                                        })
                                    });
                                });
                            });
                        });
                    });
                });
//            });

// Blog projects test
//            test("/projects", function() {
                visit("/projects");

                andThen(function () {
                    var firstEl = find(".js-container .item:eq(0) .header");
                    equal(firstEl.text(), "Project 1", "Projects are loaded and rendered");

                    // Project post
                    click(firstEl);
                    andThen(function() {
                        equal(find(".cont-outer .header h2").text(), "Project 1", "Project is loaded and rendered");
                    });

                    //Project create
                    click(find(".span4.right-side .step.blog-item .btn.btn-success"));
                    andThen(function () {
                        fillIn(find(".blog-content.blog-items .block.step div:eq(0) > input"), "PNew 10");
                        fillIn(find(".blog-content.blog-items .block.step div:eq(1) > input"), "PDescription");
                        fillIn(find(".blog-content.blog-items .block.step div:eq(3) > textarea"), "Project number 10");
                        click(find(".blog-content.blog-items .area > a.btn-primary"));

                        andThen(function() {
                            var lastEl = find(".js-container .item:eq(10) .header");
                            equal(lastEl.text(), "PNew 10", "Project created");

                            // Blog Project read
                            click(lastEl);
                            andThen(function() {
                                equal(find(".cont-outer .header h2").text(), "PNew 10", "Project is loaded and rendered");

                                // Blog Project edit
                                click(find(".cont-outer .header > a.btn-primary"));
                                andThen(function() {
                                    fillIn(find(".header .edit-state:eq(0)"), "ProjectTitleHere");
                                    fillIn(find(".header .edit-state:eq(1)"), "ProjectDescriptionHere");
                                    fillIn(find(".area .edit-state"), "ProjectTextHere");
                                    click(find(".area > a.btn-primary"));
                                    andThen(function() {
                                        equal(find(".cont-outer .header h2").text(), "ProjectTitleHere", "Project have been edited");

                                        //Blog Project delete
                                        click(lastEl);
                                        andThen(function() {
                                            click(find(".cont-outer .header > a.btn-danger"));

                                            andThen(function() {
                                                equal(find(".js-container .item:eq(10)").length, 0, "Project have been deleted");
                                            });
                                        });
                                    })
                                });
                            });
                        });
                    });
                });
//            });
        });



    });
});





// Blog contacts test
//test("/contacts", function() {
//	visit("/contacts");
//
//	andThen(function() {
//		var firstEl = find(".row-fluid.team .span4.step:eq(0) .content a:first");
//		equal(firstEl.text(), " Contact 1 ", "Contacts are loaded and rendered");
//
//		//Contact Info
//		click(firstEl);
//		andThen(function() {
//			equal(find(".cont-outer .header h2").text(), "Contact 1", "Contact is loaded and rendered");
//		})
//	});
//});



