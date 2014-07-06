module.exports = function(app, passport, auth) {

	var projects = require('../controllers/projects');

	app.get('/projects', projects.get);
	app.post('/projects', projects.post);
	app.put('/projects/:_id', projects.put);
	app.del('/projects/:_id', projects.del);
};