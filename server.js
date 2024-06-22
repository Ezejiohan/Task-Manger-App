require('dotenv').config();
const express = require('express');
const { route } = require('./routes/tasks');
const connectDB = require('./database/database');

connectDB();
const app = express();

app.get('/hello', (req, res) => {
    res.send('Task Manager App')
});

app.use(express.json());
app.use('/', route);


const PORT = 3000;


app.listen(process.env.PORT, () => {
    console.log('app is listening on PORT ' + process.env.PORT)
});
