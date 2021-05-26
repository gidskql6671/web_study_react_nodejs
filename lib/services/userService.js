const User = require('../models/User.js');

exports.signup = (user_info) => {
	return new Promise((resolve, reject) => {
		const user = new User(user_info);

		user.save()
		.then(user => resolve(user))
		.catch(err => reject(err));
	})
}