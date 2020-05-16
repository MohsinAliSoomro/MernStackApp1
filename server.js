const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const path =require('path');
const app = express();

//Middleware 
app.use(body_parser.json());

const Item = require('./route/api/item');
//DB Congfig
const db = require('./config/keys').mongoURL;
//Connection Db
mongoose.connect(db,{
                useCreateIndex:true,
                useUnifiedTopology:true,
                useNewUrlParser:true})
                .then(()=>console.log('MongoDB Connected...'))
                .catch((err)=>console.log(err));

app.use('/api/item',Item);

//If App In Production Mode
if(process.env.NODE_ENV==='production'){
    //set Static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`));