const express = require('express');
const app = express();
const route = require('./routes/tasks');

require('./database/database')
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
});

app.use(express.json());
app.use('/', route);


const PORT = 3000;

app.listen(PORT, () => {
    console.log('app is listening on PORT ' + PORT ) 
});