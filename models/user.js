const passportLocalMongoose = require('passport-local-mongoose');

const mongooseBase = require('mongoose');
const Schema = mongooseBase.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    joinedOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongooseBase.model('User', UserSchema);
