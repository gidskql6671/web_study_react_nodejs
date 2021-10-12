/* 게시물 서비스 */
const moment = require('moment'); require('moment-timezone');

// 게시물과 auto-increments 모델
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');


const id2_id = (post_info) => {
	// id -> _id로 바꿔주는 과정
	if (post_info.hasOwnProperty('id')){
		post_info._id = post_info.id;
		delete post_info.id;
	}
	
	return post_info;
}


// Post를 만든다.
// Auto-Increment를 통해 Post에 id를 지정한다.
// 반환값은 Promise로 게시물의 id 값을 반환함.
exports.createPost = ( post_info ) => {
	return new Promise((resolve, reject) => {
		let counterQuery = {name: 'postId'},
		counterUpdate = { $inc: { count: 1, id: 1 } },
		counterOptions = { upsert: true };
		
		// 하나의 문자열로 이루어진 태그들을 쉼표를 기준으로 분리해서 배열로 만듬.
		post_info.tags = post_info.tags.split(',').map(item => item.trim());
		
		Counter.findOneAndUpdate( counterQuery, counterUpdate, counterOptions).exec()
		.then( ( {count, id} ) => {
			const newPost = { 
				_id: id,
				reg_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
				...post_info
			};
			
			Post.create(newPost)
			.then( (data) => resolve(id))
			.catch( err => {
				counterUpdate = {$inc: {count: -1, id: -1}};
				Counter.findOneAndUpdate(counterQuery, counterUpdate, counterUpdate).exec();
				reject(err);
			});
		})	
		.catch( err => reject(err));
	});
};

// 객체 값과 일치하는 모든 Post 데이터를 가져온다.
// 반환값은 Promise로 게시물 정보를 반환함.
exports.getPost = (post_info) => {
	// id -> _id로 바꿔주는 함수
	id2_id(post_info)
	
	return Post.find(post_info).exec()
		.then(data => data)
		.catch(err => err);
};

// 객체 값과 일치하는 첫번째 Post 데이터를 가져온다.
// 반환값은 Promise로 게시물 정보를 반환함.
exports.getPostOne = (post_info) => {
	// id -> _id로 바꿔주는 과정
	id2_id(post_info);
	
	return Post.findOne(post_info).exec()
		.then(data => data)
		.catch(err => err);
}

// Post 데이터를 삭제한다.
// id 값이 null 일시, 모든 게시물을 삭제한다.
// id 값이 존재할 시, 해당 게시물만 삭제한다.
// 반환 값은 Promise로 삭제한 게시물 개수를 반환한다.
exports.deletePost = (post_info) => {
	// id -> _id로 바꿔주는 과정
	id2_id(post_info);
	
	return Post.deleteMany(post_info).exec()
	.then(({ deletedCount }) => {
		const query = {name: 'postId'},
				update = { inc : {count: deletedCount * -1} };
		
		return Counter.updateOne(query, update).exec();
	})
	.then(data => data)
	.catch(err => err);
};

// Post 데이터를 업데이트 한다.
// 반환 값은 Promise로 수정한 게시물 개수를 반환한다.
exports.updatePost = (old_post_info, new_post_info) => {
	// id -> _id로 바꿔주는 과정
	id2_id(old_post_info);
	id2_id(new_post_info);
	
	Post.updateMany(old_post_info, new_post_info).exec()
	.then(result => result.nModified)
	.catch(err => err);
};