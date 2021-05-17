/* User 콜렉션의 데이터를 관리할 스키마 */

const mongoose = require('mongoose');


/* Create Schema */
const userSchema = new mongoose.Schema({
	user_name: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	user_password: {
		type: String,
		required: true
	},
	email: String,
	created:{
		type: Date,
		default: Date.now
   }
},{
    versionKey: false 
});

userSchema.methods.validPassword = function(pw) {
	return this.user_password == pw;
}

// Schema를 사용하는 모델 생성
const User = mongoose.model('webStudyUser', userSchema);


module.exports = User;