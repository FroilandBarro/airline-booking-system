var mongoose= require('mongoose');
// var bcrypt= require('bcrypt')

var userSchema= new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    description: String
});

// userSchema.pre('save', function(next){
//     const user= this

//     if(user.isModified('password' || user.isNew )){
//         bcrypt.genSalt(10, (err,salt)=>{
//             if(err)return next(err)
            
//             bcrypt.hash(user.password, salt, (err, hash)=>{
//                 if(err){return next(err)}

//                 user.password=hash;
//                 next();
//                 console.log(user.password)
//             })
            

//         })
               
// }else{return next()}

// })


module.exports = mongoose.model('User', userSchema)