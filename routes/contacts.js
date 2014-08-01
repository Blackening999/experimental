module.exports = function(app, passport, auth) {

	var contacts = require('../controllers/contacts');

	app.get('/contacts', contacts.get);
	app.post('/contacts', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, contacts.post);
	app.put('/contacts/:_id', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, contacts.put);
	app.del('/contacts/:_id', auth.requiresLogin, auth.hasAuthorization, auth.isAdmin, contacts.del);
};