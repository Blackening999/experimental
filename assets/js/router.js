Blog.Router.map(function() {
	this.resource('posts', { path: '/posts'}, function() {
		this.resource('post', { path: ':post_id' }, function() {
			this.route('edit');
		});
        this.route('create');
	});
	this.resource('projects', { path: '/projects'}, function() {
		this.resource('project', { path: ':project_id'}, function() {
			this.route('edit');
		});
		this.route('create');
	});
	this.resource('contacts', { path: '/contacts'}, function() {
		this.resource('contact', { path: ':contact_id'}, function() {
			this.route('edit');
			this.route('review');
		} );
	});
    this.resource('search', { path: '/search'}, function () {
        this.route('results', { path: ':keyword'} );
    });
	this.route('login');
    this.route('catchall', { path: '/*wildcard'} )
});