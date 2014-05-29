module.exports = function(app) {
	app.get('/', require('./main').get);
	app.get('/posts', require('./posts').get);
	app.get('/projects', require('./projects').get);
	app.get('/contacts', require('./contacts').get);

	app.post('/posts', require('./posts').post);
	app.post('/projects', require('./projects').post);
	app.post('/contacts', require('./contacts').post);

	app.put('/posts/:_id', require('./posts').put);
	app.put('/projects/:_id', require('./projects').put);
	app.put('/contacts/:_id', require('./contacts').put);

	app.del('/posts/:_id', require('./posts').del);
	app.del('/projects/:_id', require('./projects').del);
	app.del('/contacts/:_id', require('./contacts').del);
};