/* 게시물 서비스 */
const moment = require('moment'); require('moment-timezone');

// 게시물과 auto-increments 모델
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');

// 인증 여부 (이건 서비스 계층이 아니라 라우터 계층에서 써야할 듯??)
const { isAuthenticated } = reqlib('config/passport.js');


// Post를 만든다.
// Auto-Increment를 통해 Post에 id를 지정한다.
// 반환값은 Promise로 게시물의 id 값을 반환함.
exports.createPost = ( {title, content, tags, reg_id} ) => {
	return new Promise((resolve, reject) => {
		let counterQuery = {name: 'postId'},
		counterUpdate = { $inc: { count: 1, id: 1 } },
		counterOptions = { upsert: true };
		
		const tags_array = tags.split(',').map(item => item.trim());
		
		Counter.findOneAndUpdate( counterQuery, counterUpdate, counterOptions).exec()
		.then( ( {count, id} ) => {
			const newPost = { 
				_id: id, 
				title: title, 
				content: content,
				tags: tags_array,
				reg_id: reg_id,
				reg_dt: moment().format('YYYY-MM-DD HH:mm:ss')
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

// Post 데이터를 가져온다.
// id 값이 null 일시, 모든 게시물을 가져온다.
// id 값이 존재할 시, 해당 게시물만 가져온다.
// 반환값은 Promise로 게시물 정보를 반환함.
exports.getPost = ({ id = null }) => {
	return new Promise((resolve, reject) => {
		if (id == null){
			Post.find({}).exec()
			.then(data => {
				resolve(data);
			})
			.catch( err => reject(err));
		}
		else{
			Post.findOne({_id: id}).exec()
			.then(data => {
				resolve(data);
			})
			.catch( err => reject(err));
		}
	})
};

// Post 데이터를 삭제한다.
// id 값이 null 일시, 모든 게시물을 삭제한다.
// id 값이 존재할 시, 해당 게시물만 삭제한다.
// 반환 값은 Promise로 삭제한 게시물 개수를 반환한다.
exports.deletePost = ({ id = null }) => {
	return new Promise((resolve, reject) => {
		if (id == null){
			const query = {name: 'postId'},
					  update = { $set : {count: 0, id: 0} },
					  options = { upsert: true };
			
			const p1 = Post.deleteMany({}).exec();
			const p2 = Counter.updateOne(query, update, options).exec();
			
			Promise.all([p1, p2])
			.then(([result_post, reulst_counter]) => resolve(result_post.deletedCount))
			.catch(err => reject(err));
		}
		else{
			const query = {name: 'postId'},
				  update = { inc : {count: -1} };
			
			
			const p1 = Post.deleteOne({_id: id}).exec();
			const p2 = Counter.updateOne(query, update).exec();
			
			Promise.all([p1, p2])
			.then(([result_post, reulst_counter]) => resolve(result_post.deletedCount))
			.catch(err => reject(err));
		}
	})
};

// Post 데이터를 업데이트 한다.
// 반환 값은 Promise로 수정한 게시물 개수를 반환한다.
exports.updatePost = ({id}, {title, content, tags}) => {
	return new Promise((resolve, reject) => {
		Post.update({_id: id}, { title, content, tags }).exec()
		.then(result => resolve(result.nModified))
		.catch(err => reject(err));
	});
};