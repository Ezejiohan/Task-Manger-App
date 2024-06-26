require('dotenv').config();
const express = require('express');
const {route} = require('./routes/tasks');
const {userRoute}  = require('./routes/users');
const connectDB = require('./database/database');
connectDB();
const app = express();
const {notFound} = require('./middleware/not_ found');
const errorHandlerMiddleware = require('./middleware/errorhandler');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', route);
app.use('/', userRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;


app.listen(process.env.PORT, () => {
    console.log('app is listening on PORT ' + process.env.PORT)
});
