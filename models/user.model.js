const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    phone: {type: String, required: true, unique: true},
    name: {type: String, required: true},
})

module.exports = model("User", UserSchema);