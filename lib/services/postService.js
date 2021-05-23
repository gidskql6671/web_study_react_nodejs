/* 게시물 서비스 */
const moment = require('moment'); require('moment-timezone');

// 게시물과 auto-increments 모델
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');

// 인증 여부 (이건 서비스 계층이 아니라 라우터 계층에서 써야할 듯??)
const { isAuthenticated } = reqlib('config/passport.js');


// Post를 만든다.
// Auto-Increment를 통해 Post에 id를 지정한다.
// 반환값은 Promise
exports.createPost = ( {title, content, tags, reg_id} ) => {
	return new Promise((resolve, reject) =>{
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
				reject(new Error("게시물 생성 실패"));
			});
		})	
		.catch( err => reject(new Error("게시물 생성 실패")));
	});
}

exports.getPost = () => {
	
}