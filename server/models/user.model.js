const mongoose  = require("mongoose");

// Schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type:String,
        required:true,
        enum:["admin", "manager", "user"]
    }
}, {timestamps:true});

const User = mongoose.model('User', UserSchema);
module.exports = User;