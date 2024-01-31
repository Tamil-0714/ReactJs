const express = require('express');
const fetchUsers = require('./routes/fetchUsers');
const cors = require('cors')
const app = express();

app.use(cors())
app.use('/fetchUsers', fetchUsers)

app.listen(4050, ()=>{
    console.log("port on 4050");
})
