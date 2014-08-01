module.exports = function(app, passport, auth) {

	var projects = require('../controllers/projects');

	app.get('/projects', projects.get);
	app.post('/projects', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, projects.post);
	app.put('/projects/:_id', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, projects.put);
	app.del('/projects/:_id', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, projects.del);
};