import React,{useState,useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default ()=>{
    const [posts,setPosts]=useState({});
    const onLoadPosts=async(e)=>{
      
      const res=  await axios.get("http://localhost:4002/posts");
        setPosts(res.data);

    }
    useEffect(()=>{
        onLoadPosts()
    },[])
    const renderPosts=Object.values(posts).map(post=>{
        return(
            <div className="card" style={{width:'30%',marginBottom:"20px"}}
            key={post.id}>
                <div className="card-body">
        <h3>{post.title}</h3>
                </div>
                <CommentList  comments={post.comments}/>
                <CommentCreate postId={post.id}/>
        </div>
    )
})
return(
<div style={{display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"}}>
    {renderPosts}
</div>
)}