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
	content: String,
	created:{
		type: Date,
		default: Date.now
   }
},{
    versionKey: false 
});



// Schema를 사용하는 모델 생성
const Post = mongoose.model('Post', postSchema);


module.exports = Post;