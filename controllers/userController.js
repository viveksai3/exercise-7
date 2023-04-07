const User = require('../models/user');

exports.userSignUp = (req, res)=>{
    res.render('./user/new');
};

exports.userSignUpAction = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
       .then(()=> {
        req.flash('success', "User Signup Success, Please login to continue");;
         res.redirect('/users/login');
       }
       )
       .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }

        if(err.code === 11000){
            req.flash('error', 'Email address already exists');
            return res.redirect('/users/new');
        }
        next(err);
       });
};

exports.userLogin = (req, res)=>{
    res.render('./user/login');

};

exports.userLoginAction = (req, res, next)=>{
//authenticate
let email = req.body.email;
let password = req.body.password;

//get user matches the email
User.findOne({email:email})
.then(user =>{
    if(user){
        //user found
        user.comparePassword(password)
        .then(result =>{
            if(result){
                req.session.user = user._id;//store user id in session
                req.flash('success','login successful');
                res.redirect('/users/profile');
            }else{
                console.log('wrong password');
                req.flash('error','wrong password');
                res.redirect('/users/login');
            }
        })
        .catch()
    }else{
        console.log('wrong email');
        req.flash('error','wrong email');
        res.redirect('/users/login');
    }
})
.catch(err=>next(err));
};

exports.userProfile = (req, res, next)=>{
    let id = req.session.user;
    if(!id){
        res.redirect('/users/login')
    }else{
        User.findById(id)
        .then(user=>res.render('./user/profile',{user}))
        .catch(err=>next(err));
    }
   
};

exports.userLogout = (req, res, next)=>{
    req.session.destroy((err)=>{
        if(err){
            return next(err);
        }else{
            res.redirect('/users/login');
        }
    })
};