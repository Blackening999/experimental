module.exports = function(app, passport, auth) {

	var contacts = require('../controllers/contacts');

	app.get('/contacts', contacts.get);
	app.post('/contacts', contacts.post);
	app.put('/contacts/:_id', contacts.put);
	app.del('/contacts/:_id', contacts.del);
};