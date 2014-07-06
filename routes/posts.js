module.exports = function(app, passport, auth) {

	var posts = require('../controllers/posts');

	app.get('/posts', posts.get);
	app.post('/posts', posts.post);
	app.put('/posts/:_id', posts.put);
	app.del('/posts/:_id', posts.del);


	// app.post('/posts', auth.requiresLogin, posts.create);
	// app.put('/posts/:postId', auth.requiresLogin, auth.post.hasAuthorization, posts.update);
	// app.del('/posts/:postId', auth.requiresLogin, auth.post.hasAuthorization, posts.destroy);
//	app.del('/posts/:postId', auth.requiresLogin, auth.post.hasAuthorization, posts.destroy);

	//Finish with setting up the postId param
//	app.param('postId', posts.post);
};