var restful= require ('node-restful');
var mongoose= require('mongoose');
// var bcrypt= require ('bcrypt');

const adminSchema= new mongoose.Schema ({
    adminId:{
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

module.exports = restful.model('Admin', adminSchema);