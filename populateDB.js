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
            email: "pointhomefinal@gmail.com",
            address: "Kiev, Ukraine",
            phone: "38 066 581 363 1",
            skype: "freestyleXXL",
            googleplus: "https://plus.google.com/103347953991494792339/posts",
            linkedin: "https://www.linkedin.com/profile/view?id=275903237",
            facebook: "https://www.facebook.com/pointhomefinal",
            twitter: "https://twitter.com/Blackening999",
            github: "https://github.com/Blackening999",
            credentials: "dfsdf",
            portfolio: "I'm <span style='color: rgb(255, 255, 255); font-weight: bold;'>Vladimir Katansky</span>, young and ambitious web developer with endless energy which has only one output - create new systems, worlds, everything! Nothing is impossible and only the time can limit. I have only <span style='color: rgb(206, 231, 247);'>2 years of commercial experience</span> and I do not limit myself just with current job. The greatest passion for me is to learn new technologies or practice well-known things in most extraordinary ways in my spare time. Also I have a best wife in the world with infinite patience :) Without her I would be no different from the computer.<div><br></div><div>My first meeting with programming was back in 2005 in the school. It was amazing experience with <span style='color: rgb(156, 156, 148);'>Turbo Pascal</span><span style='color: rgb(239, 239, 239);'>.</span> But few moments ago, I've realised that I can't devote myself to this. Next meeting was in 2008 in the Sevastopol National Technical University with <span style='color: rgb(156, 156, 148);'>Java</span> programming language. It comes up with pain and misunderstanding of the concepts, our teachers expect too much from us in that exact moment. And only in the late of 2010 I've decided to become true developer. I started absorbing the knowledge as thirsting wanderer in the large desert but it always wasn't enough for me. After a few months I've started 'double-learning' process in the University and in this hard and breathtaking process I felt that I want to do it all my life.</div><div><br></div><div>In my last year in University I attended <span style='color: rgb(156, 156, 148);'>SoftServe IT Academy</span> course and then created my first big program - RIA WebShop Engine written in <span style='color: rgb(156, 156, 148);'>Ruby on Rails</span>&nbsp;and <span style='color: rgb(156, 156, 148);'>Backbone</span>. It was my&nbsp;examination project on that courses and my diploma as well. This Engine allows create the simple web shop in a few weeks without loosing the flexibility - just saving the time creating standard flow. It has 5 basic roles: Administrator, Merchandiser, Supervisor, Customer and Guest and all relative functions for each role. Application has been written using <span style='color: rgb(156, 156, 148);'>RESTful</span> concepts and with low level of complexity in order to have an easy maintain. Then I've spotted the vacancy in <span style='color: rgb(156, 156, 148);'>Aspose's</span> <span style='color: rgb(156, 156, 148);'>Banckle</span> venture. I've heard a lot about <span style='color: rgb(156, 156, 148);'>Aspose</span> and <span style='color: rgb(156, 156, 148);'>Banckle</span> and it would be great to arrange in such company, especially without any commercial experience.</div><div><br></div><div>Now I'm <span style='color: rgb(255, 255, 255);'>Chief Front-End Engineer</span> in the <span style='color: rgb(156, 156, 148);'>Banckle.Email</span> team. It was a long way - I started with Junior position and few months later I've been granted with permission to implement architecture to the apps and do almost everything on the front-end part of applications. This was a chance to reduce the lack of experience and knowledge, fortune turned to face me. Since then I have been implementing brand-new approaches everywhere.&nbsp;</div><div><br></div><div>While I worked on the main job I've started to learn back-end web-applications and since my favourite programming language was <span style='color: rgb(231, 156, 156);'>JavaScript</span> I've spotted <span style='color: rgb(156, 156, 148);'>Node</span>. It is unlimited power - one language to rule them all (c). I become crazy about <span style='color: rgb(231, 156, 156);'>JavaScript</span> since then, its hybrid nature of functional and object language won my developer's heart forever. I have an interesting contrast - on my job I'm using native <span style='color: rgb(231, 156, 156);'>JavaScript</span> + <span style='color: rgb(156, 156, 148);'>jQuery</span> and in my own experiments and projects - technologies like <span style='color: rgb(156, 156, 148);'>Node</span>, <span style='color: rgb(156, 156, 148);'>Backbone</span> and <span style='color: rgb(231, 99, 99);'>Ember</span>. Yes, <span style='color: rgb(231, 99, 99);'>Ember</span>. As soon as I learned about <span style='color: rgb(231, 99, 99);'>Ember</span>, I fell in love second time! It was FASCINATING! My adorable <span style='color: rgb(231, 156, 156);'>JavaScript</span> in the in brand new suit, in AWESOME suit! I was inspired by it so much that I've planned to create my own blog where I can share my experience and knowledge about it and do not limit it to only Ember but to everything that I found awesome in the Lord of The Programming Languages - in <span style='color: rgb(231, 156, 156);'>JavaScript</span>.</div><div><br></div><div>You can learn more about me via social links in the footer. I'm speaking <span style='color: rgb(206, 198, 206);'>Russian</span>, <span style='color: rgb(206, 198, 206);'>Ukrainian</span>, <span style='color: rgb(206, 198, 206);'>English</span> and little bit of <span style='color: rgb(206, 198, 206);'>French</span>, so if you know at least one of these languages and want to have a conversation with me - do not hesitate, I'm freelancer if you can see and it's very important for me to have any feedback!</div><div><br></div><div><span style='font-weight: bold; color: rgb(255, 255, 255);'>Contacts:</span></div><div><span style='color: rgb(206, 231, 247);'>Skype</span>: <span style='color: rgb(239, 239, 239);'>freestyleXXL</span></div><div><span style='color: rgb(206, 231, 247);'>Email</span>: <span style='color: rgb(239, 239, 239);'>pointhomefinal@gmail.com</span></div><div>...and a lot of social links...</div><div><br></div><div>You can find my <span style='color: rgb(255, 255, 255);'>resume</span> here: https://www.dropbox.com/s/kz1atymbl5fakhw/Katansky%20Vladimir%20CV.pdf</div><div><br></div><div><br></div>",
			photo: "https://s.gravatar.com/avatar/203df6a89b6258a13ffbeee5612cda0f?s=80"

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