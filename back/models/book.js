
var mongoose= require('mongoose');
var bcrypt= require('bcrypt')

var customerRegister= new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    description: String
})