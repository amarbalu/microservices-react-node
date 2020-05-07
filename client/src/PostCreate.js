import React,{useState} from "react";
import axios from "axios";

export default ()=>{
    const [title,setTitle]=useState('');
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:4000/posts",{
            title
        }).then(res=>{
            setTitle("")
        })

    }
    return(
        <div>
            <form onSubmit={onSubmit} className="form-group">
           
                <label>Title</label>
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="form-control"></input>
                <button type="submit" className="btn btn-primary">Create Post</button>
              
            </form>
        </div>
    )
}