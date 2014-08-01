var mongoose = require('libs/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
	open,
	dropDataBase,
	requireModels,
	createPosts,
	createProjects,
	createContacts,
    createAdmins
], function(err) {
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDataBase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('models/post');
	require('models/project');
	require('models/contact');
    require('models/user');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createPosts(callback) {
	var posts = [
		{
			title: "New 1",
			description: "It is new number one",
			category: "JavaScript",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 2",
			description: "It is new number one",
			category: "jQuery",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 3",
			description: "It is new number one",
			category: "Front-End",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 4",
			description: "It is new number one",
			category: "jQuery",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 5",
			description: "It is new number one",
			category: "JavaScript",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 6",
			description: "It is new number WRONG",
			category: "JavaScript",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 7",
			description: "It is new number WRONG",
			category: "Front-End",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 8",
			description: "It is new number WRONG",
			category: "JavaScript",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "New 9",
			description: "It is new number WRONG",
			category: "jQuery",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		}
	];

	async.each(posts, function(postData, callback) {   //this kind of each drops argument "affected" in callback,
		var post = new mongoose.models.Post(postData); //so we don't need to reduce arguments to (err, results) from (err, results, affected)
		post.save(callback);
	}, callback);
}

function createProjects(callback) {
	var projects = [
		{
			title: "Project 1",
			description: "It is new number one",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 2",
			description: "It is new number one",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 3",
			description: "It is new number one",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 4",
			description: "It is new number one",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 5",
			description: "It is new number one",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 6",
			description: "It is new number WRONG",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 7",
			description: "It is new number WRONG",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 8",
			description: "It is new number WRONG",
			cover: "http://placehold.it/1000x800.png",
			items: [],
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 9",
			description: "It is new number WRONG",
			cover: "http://placehold.it/1000x800.png",

			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		},
		{
			title: "Project 10",
			description: "It is new number WRONG",
			cover: "http://placehold.it/1000x800.png",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet.",
			postedAt: new Date()
		}
	];

	async.each(projects, function(projectData, callback) {   //this kind of each drops argument "affected" in callback,
		var project = new mongoose.models.Project(projectData); //so we don't need to reduce arguments to (err, results) from (err, results, affected)
		project.save(callback);
	}, callback);
}

function createContacts(callback) {
	var contacts = [
		{
			name: "Contact 1",
			direction: "Front-End Developer",
			age: 22,
			skills: ['js', 'html5'],
			photo: "http://placehold.it/1000x800.png",
			portfolio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet."
		},
		{
			name: "Contact 2",
			direction: "Back-End Developer",
			age: 22,
			skills: ['js', 'html5'],
			photo: "http://placehold.it/1000x800.png",
			portfolio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet."
		},
		{
			name: "Contact 3",
			direction: "SQL Developer",
			age: 22,
			skills: ['js', 'html5'],
			photo: "http://placehold.it/1000x800.png",
			portfolio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis erat congue tellus fringilla, vel consectetur nulla luctus. Sed faucibus odio neque, in mollis ipsum fermentum sit amet. Mauris vehicula nisl justo, at venenatis nisl eleifend sed. Nulla nec sem nec nunc placerat vehicula. Vivamus interdum dolor eget magna ornare, id placerat dolor dictum. Quisque egestas ut lectus sit amet pellentesque. Nam posuere tristique libero, sed porta velit laoreet sit amet."
		}
	];

	async.each(contacts, function(contactData, callback) {   //this kind of each drops argument "affected" in callback,
		var contact = new mongoose.models.Contact(contactData); //so we don't need to reduce arguments to (err, results) from (err, results, affected)
		contact.save(callback);
	}, callback);
}

function createAdmins(callback) {
    var admins = [
        {
            name: "aaa",
            is_admin: true,
            email: "aaa",
            password: "aaa"
        },
        {
            name: "adminka2",
            is_admin: true,
            email: "admin2",
            password: "1234"
        },
        {
            name: "blackening",
            is_admin: true,
            is_owner: true,
            email: "pointhomefinal@gmail.com",
            password: "farcry11"
        }
    ];

    async.each(admins, function(adminData, callback) {   //this kind of each drops argument "affected" in callback,
        var admin = new mongoose.models.User(adminData); //so we don't need to reduce arguments to (err, results) from (err, results, affected)
        admin.save(callback);
    }, callback);
}