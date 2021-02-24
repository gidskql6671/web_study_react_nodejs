/* Counter 콜렉션의 데이터를 관리할 스키마 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const counterSchema = new Schema({
	name: String,
	counter: Number
});

// Schema를 사용하는 모델 생성
const Counter = mongoose.model('Counter', counterSchema);


module.exports = Counter;