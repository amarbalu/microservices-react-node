const express=require('express');
const app = express();
const {randomBytes}=require('crypto');
const bodyParser= require('body-parser');
const cors =require('cors');
const posts={}
app.use(cors())

app.get('/posts',(req,res)=>{
res.send( posts)
})
app.post('/posts',bodyParser.json(),(req,res)=>{
const id=randomBytes(4).toString('hex');
const {title}=req.body;
posts[id]={
    "id":id,
    "title":title
}
res.status(202).json(posts);
})
app.listen(4000,()=>{
    console.log('listening to 4000')
})