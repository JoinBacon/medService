const {Schema, model} = require('mongoose');

const DoctorSchema = new Schema({
    name: {type: String, required: true},
    spec: {type: String, required: true},
    slots: [
        {
            time: {type: Date, required: true},
            isFree: {type: Boolean, default: true}
        }
    ]
})

module.exports = model('Doctor', DoctorSchema);