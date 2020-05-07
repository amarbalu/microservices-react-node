const express=require('express');
const app = express();
const {randomBytes}=require('crypto');
const bodyParser= require('body-parser');
const cors =require('cors');
const axios=require('axios');
const commentsByPostId={}
app.use(cors());
app.use(bodyParser.json())
app.get('/posts/:id/comments',(req,res)=>{
res.send( commentsByPostId[req.params.id]|| [])
})
app.post('/posts/:id/comments',async(req,res)=>{
const commentId=randomBytes(4).toString('hex');
const {content}=req.body;
const comments=commentsByPostId[req.params.id]|| [];
comments.push({id:commentId,content});
commentsByPostId[req.params.id]=comments;
await axios.post('http://localhost:4005/events',{
    type:"CommentCreated",
    data:{
        id:commentId,content,
        postId:req.params.id
    }
})

res.status(201).send(comments);

});
app.post('/events',(req,res)=>{
    console.log("Event Received",req.body.type)
        res.send({});
    })
app.listen(4001,()=>{
    console.log('listening to 4001')
})