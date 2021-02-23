/* post 데이터베이스르 관리할 스키마 */

module.exports = function(app){
	const mongoose = app.locals.db;
	const Schema = mongoose.Schema;
	
	console.log(mongoose);

	// Create Schema
	const postSchema = new Schema({
		name: String,
		age: Number
	});

	// Schema를 사용하는 모델 생성
	const Post = mongoose.model('Post', postSchema);

	return Post;
}