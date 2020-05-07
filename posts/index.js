const express=require('express');
const app = express();
const {randomBytes}=require('crypto');
const bodyParser= require('body-parser');
const cors =require('cors');
const axios=require('axios');
const posts={}
app.use(cors())
app.use(bodyParser.json())
app.get('/posts',(req,res)=>{
res.send( posts)
})
app.post('/posts',async(req,res)=>{
const id=randomBytes(4).toString('hex');
const {title}=req.body;
posts[id]={
    "id":id,
    "title":title
}
await axios.post('http://localhost:4005/events',{
    type:"PostCreated",
    data:{
        id,title
    }
})
res.status(201).json(posts);
})
app.post('/events',(req,res)=>{
console.log("Event Received",req.body.type)
    res.send({});
})
app.listen(4000,()=>{
    console.log('listening to 4000')
})