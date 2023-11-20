const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const connectToDb = require('./db');
const cors = require('cors');

connectToDb(); // fun for connection of db

const app = express();   
     
app.use(cors()); // use cors
app.use(express.json()); // converts json -> parsed data 
app.use(bodyParser.urlencoded({extended: true})); // to use body-parser

app.use('/', require('./routes/products'));
 

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});  
