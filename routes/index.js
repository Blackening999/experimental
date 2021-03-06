module.exports = function(app, passport, auth) {

	require('./auth')(app, passport, auth);
	require('./posts')(app, passport, auth);
	require('./projects')(app, passport, auth);
	require('./contacts')(app, passport, auth);
    require('./comments')(app, passport, auth);

	var index = require('../controllers/index');
	app.get('/', index.render);
    app.get('/search/:keyword', index.search);
};