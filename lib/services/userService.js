const User = require('../models/User.js');


// 해당 id가 이미 등록되어 있는지 확인한다.
const idExists = (id) => {
	return new Promise((resolve, reject) => {
		User.exists({id})
		.then(result => resolve(result))
		.catch(err => reject(err));
	})
}

// 해당 이름이 이미 등록되어 있는지 확인한다.
const nameExists = (name) => {
	return new Promise((resolve, reject) => {
		User.exists({name})
		.then(result => resolve(result))
		.catch(err => reject(err));
	})
}


// 회원가입 서비스
// 반환 값은 Promise로 성공시 회원가입된 유저의 정보를 반환
exports.signup = (user_info) => {
	return new Promise((resolve, reject) => {
		const user = new User(user_info);
		
		idExists(user.id)
		.then(exists => {
			if (exists)
				return reject("idExists");
			return nameExists(user.name);
		})
		.then(exists => {
			if (exists)
				return reject("nameExists");
			return user.save()
		})
		.then(user => resolve(user))
		.catch(err => reject(err));
	})
}


// 정보 변경 서비스
// user_info에 담긴 id에 해당하는 유저의 정보를 변경함.
exports.changeInfo = (user_info) => {
	return new Promise((resolve, reject) => {
		User.findOne({id: user_info.id}).exec()
		.then(user => {
			Object.assign(user, user_info)
			
			return user.save()
		})
		.then(user => resolve(user))
		.catch(err => reject(err));
	})
}

// 회원탈퇴 서비스
exports.deleteUser = (user_info) => {
	return new Promise((resolve, reject) => {
		User.deleteOne({id: user_info.id}).exec()
		.then(user => resolve(user))
		.catch(err => reject(err));
	})
}