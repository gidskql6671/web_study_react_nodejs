const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const counterSchema = new Schema({
	name: String,
	count: Number, // Post들의 총 개수를 샌다.
	id: Number     // Post들에 부여할 아이디 값이다.
},{
    versionKey: false 
});

// Schema를 사용하는 모델 생성
const Counter = mongoose.model('webStudyCounter', counterSchema);


module.exports = Counter;