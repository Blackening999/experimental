var express = require('express'),
	fs = require('fs'),
	passport = require('passport');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	config = require('./config/config'),
	auth = require('./middlewares/authorization'),
	db = require('./libs/mongoose');

var models_path = __dirname + '/models';
var walk = function(path) {
	fs.readdirSync(path).forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		if (stat.isFile()) {
			if (/(.*)\.(js|coffee)$/.test(file)) {
				require(newPath);
			}
		} else if (stat.isDirectory()) {
			walk(newPath);
		}
	});
};
walk(models_path);


require('./libs/passport')(passport);

////control point
var app = express();

//express settings
require('./libs/express')(app, passport, db);

//Bootstrap routes
require('./routes')(app, passport, auth);

//Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
//
//app.set('view engine', 'ejs');
////app.engine('html', require('hbs').__express);
////app.set('view engine', 'html');
//app.set('views', path.join(__dirname, 'views'));
//
////app.use(express.favicon());
//
//if (app.get('env') == 'development') {
//	app.use(express.logger('dev'));
//} else {
//	app.use(express.logger('default'));
//}
//
//app.use(express.json({limit: '6mb'}));
//app.use(express.urlencoded({limit: '6mb'}));
//
//app.use(express.cookieParser());
//
//app.use(express.session({ secret: config.get('session:secret') }));
//
////middleware
//
//app.use(app.router);
//require('./routes')(app);
//
////client-code
//app.use(express.static(path.join(__dirname, 'builds')));
//
////404
//app.use(function(req, res) {
//	res.send(404, "Page not found");
//});
//
//var server = http.createServer(app).listen(config.get('port'), function() {
//	console.log('Express server listening on port ' + config.get('port'));
//});
