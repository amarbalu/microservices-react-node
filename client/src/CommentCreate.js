import React,{useState} from "react";
import axios from "axios";

export default ({postId})=>{
    const [content,setContent]=useState("");
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            content
        });
        setContent("");

    }
    return (
        <div>
        <form onSubmit={onSubmit} className="form-group">
       
            <label>New Comment</label>
            <input type="text" value={content} onChange={e=>setContent(e.target.value)} className="form-control"></input>
            <button type="submit" className="btn btn-primary">Add</button>
          
        </form>
    </div>
    )
}