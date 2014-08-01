var userIsAdmin = require('./admins.js').userIsAdmin;

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'You are not authorized');
    }
    next();
};

/**
 * User authorization access middleware
 */
exports.hasAuthorization = function (req, res, next) {
    var user = req.user;
    if (req._passport.session.user != user.id) {
        return res.send(401, 'You are not authorized');
    }
    next();
};

/**
 * Admin authorization access middleware
 */
exports.isAdmin = function (req, res, next) {
    if (!userIsAdmin(req.user._doc.email)) {
        return res.send(401, 'You are not admin');
    }
    next();
};