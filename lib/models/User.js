/* User 콜렉션의 데이터를 관리할 스키마 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


/* Create Schema */
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	id: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
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
	let user = this;
	return bcrypt.compareSync(pw, user.password);
}


// ~.pre()를 통해 해당 스키마에 데이터가 저장되기 전(.save) 수행할 작업들을 지정할 수 있다.
userSchema.pre("save", function(next) {
	let user = this;
	
	if (user.isModified("password")){
		bcrypt.genSalt(10, (err, salt) => {
			if (err)
				return next(err);
			bcrypt.hash(user.password, salt, (err, hash) =>{
				if (err)
					return next(err);
				user.password = hash;
				next();
			})
		})
	}
	else{
		next();
	}
})


// Schema를 사용하는 모델 생성
const User = mongoose.model('webStudyUser', userSchema);


module.exports = User;