const express = require('express');
const router = require('./routes');
const cors  = require('cors'); //cross origin rsource sharing, 
const mongoose = require('mongoose');
const app = express();
const port = 5000; 

 app.use(express.json());
 app.use(express.urlencoded({"extended":true})),

app.use(cors());
app.use('/api', router);

// for image below
// app.use(express.static('public' ));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect('mongodb://localhost:27017/HRMS');

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})



