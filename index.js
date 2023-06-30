require('dotenv').config()
const express = require('express');
const dbService = require('./DB.service');
const mongoose = require("mongoose").default;

const app = new express();
PORT = process.env.PORT || 5000;

app.use(express.json())

app.post('/create-order', async (req, res) =>{
    try{
        const {userID, doctorID, slot} = req.body;
        const time = new Date(slot);
        await dbService.createOrder(userID, doctorID, time);
        return res.json({message: 'Запись прошла успешно!'})
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

app.get('/notice/:ID', async (req, res) => {
    try {
        const userID = req.params.ID;
        await dbService.notice(userID);
        res.end('Ok');
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, ()=> console.log(`Server is working on port = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()