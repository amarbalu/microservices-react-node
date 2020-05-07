const express=require('express');
const bodyParser= require('body-parser');
const cors =require('cors');
const axios=require('axios');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts={}
app.get('/posts',(req,res)=>{
    res.send(posts)
});
const handleEvents=(type,data)=>{
    if(type==="PostCreated"){
        const {id,title}=data;
        posts[id]={id,title,comments:[]};
    }
if(type==="CommentCreated"){
    const {id,content,postId,status}=data;
    posts[postId].comments.push({id,content,status})
}
if(type==="CommentUpdated"){
    const {id,content,postId,status}=data;
   const comment= posts[postId].comments.find(comment=>comment.id===id);
   comment.status=status;
   comment.content=content;
}
}

app.post('/events',(req,res)=>{
    const {type,data}=req.body;
   
    handleEvents(type,data)
    res.send({})
});

app.listen(4002,async()=>{
    console.log('Listening to 4002');
    const res=await axios.get('http://localhost:4005/events');
    for(let event of res.data){
        console.log("Processing Events:",event.type)
        handleEvents(event.type,event.data);
    }
})