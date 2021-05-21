/* Posts 콜렉션의 데이터를 관리할 스키마 */

const mongoose = require('mongoose');


/* Create Schema */
const postSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	tag: [String],
	view_count: {
		type: Number,
		required: true,
		default: 0
	},
    reg_id: {
		type: String,
		required: true
	},
    reg_dt: {
		type: String
	 }
},{
    versionKey: false 
});



// Schema를 사용하는 모델 생성
const Post = mongoose.model('webStudyPost', postSchema);


module.exports = Post;