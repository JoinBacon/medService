const UserModel = require('./models/user.model');
const DoctorModel = require('./models/doctor.model');
const OrderModel = require('./models/order.model');
const fs = require('fs/promises');

class DBService {
    async createOrder(userID, doctorID, slot){
        const user = await UserModel.findById(userID);
        const doctor = await DoctorModel.findById(doctorID);
        if (!user || !doctor){
            throw Error("Пользователь или врач с такими ID не найдены");
        }
        const freeSlots = doctor.slots;
        const slotStatus = freeSlots.find(obj => obj.time.toString() === slot.toString())
        if(!slotStatus){
            throw Error('Слота с таким временем нет');
        }
        if(slotStatus.isFree){
            const order = await OrderModel.create({userID, doctorID, time: slot});
            slotStatus.isFree = false;
        } else{
            throw Error('Данный слот занят другим пациентом');
        }
        return doctor.save();
    }

    async notice(userID) {
        const user = await UserModel.findById(userID);
        if (!user) {
            throw Error("Пользователь с такими ID не найдены");
        }
        const currDate = new Date();
        const userOrders = await OrderModel.find({userID}).populate('doctorID');
        for(const order of userOrders){
            if(Math.floor((order.time - currDate)/ (1000 * 60 * 60 * 24) ) === 1){
               await fs.appendFile('file.txt', `${currDate.toISOString()} | Привет, ${user.name}!`
                + ` Напоминаем что вы записаны к ${order.doctorID.spec.toLowerCase()} завтра в ${order.time.toISOString()} \n`, 'utf8')

            }

            if(Math.floor((order.time - currDate)/ (1000 * 60 * 60) ) === 2){
                await fs.appendFile('file.txt', `${currDate.toISOString()} | Привет, ${user.name}!`
                    + `Вам через 2 часа к ${order.doctorID.spec.toLowerCase()} в ${order.time.toISOString()} \n`, 'utf8')

            }
        }
    }
}

module.exports = new DBService();