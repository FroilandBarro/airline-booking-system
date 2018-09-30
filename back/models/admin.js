var restful= require ('node-restful');
var mongoose= require('mongoose');
// var bcrypt= require ('bcrypt');

const adminSchema= new mongoose.Schema ({
    adminId:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = restful.model('Admin', adminSchema);