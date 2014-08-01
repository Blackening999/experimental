module.exports = function(app, passport, auth) {

    var comments = require('../controllers/comments');

    app.get('/comments', comments.get);
    app.post('/comments', auth.requiresLogin, auth.hasAuthorization, comments.post);
    app.put('/comments/:_id', auth.requiresLogin, auth.hasAuthorization, comments.put);
    app.del('/comments/:_id', auth.requiresLogin, auth.hasAuthorization, comments.del);
};