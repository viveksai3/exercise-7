const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName :{type:String, required:[true,'cannot be empty']},
    lastName :{type:String, required:[true,'cannot be empty']},
    email :{type:String, required:[true,'cannot be empty'], unique : true},
    password :{type:String, required:[true,'cannot be empty']}

});

//replacing plain text to hash before db save
//pre middleware

userSchema.pre('save', function (next){

    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash=>{
        user.password =  hash;
        next();
    })
    .catch(err=>next(err));
});

//mthod to compare hash and user entered pwd from login
userSchema.methods.comparePassword = function(loginPassword){
    return bcrypt.compare(loginPassword, this.password);
    
}

module.exports = mongoose.model('User', userSchema);