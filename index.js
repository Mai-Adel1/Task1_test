const express = require("express");
//const Joi = require('Joi');
const app = express();
app.use(express.json);


const events = [
    {id:1 ,  name: "Event1"},
    {id:2 ,  name: "Event2"},
    {id:3 ,  name: "Event3"}
]

app.get('/',(req,res) =>{
    res.send('Hello World!');
});

app.get('/api/events',(req,res) =>{
    res.send(events);
});

app.get('/api/events/:id',(req,res) =>{
    const event = events.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The Course with the given D not found !`);
    }else{
        res.send(event);
    }
});

app.get('/api/events/:year/:month',(req,res) =>{
    res.send(req.params);
});

app.get('/api/events/:year/:month',(req,res) =>{
    res.send(req.query);
});




///////////////////////
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`listening on port ${port} ...`));