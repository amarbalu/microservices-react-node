const express=require('express');
const cors=require('cors');
const axios=require('axios');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

app.post('/events',async(req,res)=>{
    const {type,data}=req.body;
    if(type==="CommentCreated"){
         await   axios.post("http://localhost:4005/events",{
                type:"CommentModerated",
                data:{
                id:data.id,
                postId:data.postId,
                content:data.content,
                status:data.content.includes("orange")?"rejected":"approved"
                }

            })
   
    }
    res.send({})

});

app.listen(4003,()=>{
    console.log("Listening to 4003 ")
})

