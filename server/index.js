const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config/database')
require('dotenv').config()
const router = require('./routes');
const cors = require('cors');
const bodyParse = require('body-parser')

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})