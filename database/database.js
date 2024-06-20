const mongoose = require('mongoose');

const connectString = DATABASE= 
    "mongodb+srv://Ezejiohan:Passenger24@cluster0.yqqou7r.mongodb.net/Task Manager App"

mongoose.connect(connectString).then(() => {
    console.log('Connected To MongoDB')
}).catch((err) => {
    console.log(err.message)
});

