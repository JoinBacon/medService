const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    doctorID: {type: Schema.Types.ObjectId, ref: 'Doctor'},
    time: {type: Date}
})

module.exports = model('Order', OrderSchema);