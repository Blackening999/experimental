var adminIds = [ 'pointhomefinal@gmail.com', 'aaa' ];

function userIsAdmin(userId) {
	console.log('checking userId: ' + userId);
	for (var i = 0; i < adminIds.length; i++) {
		console.log('checking adminId: ' + adminIds[i]);
		if (adminIds[i] == userId) {
			return true;
		}
	}
}

exports.userIsAdmin = userIsAdmin;