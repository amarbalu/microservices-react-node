import React from "react";



export default ({comments})=>{ 
    const renderComments=comments.map(comment=>{
       
        return(
            <li
            key={comment.id}>
            {comment.status==="pending"?"This comment awaiting moderation":
            comment.status==="rejected"?"The comment has been rejected":comment.content}
        </li>
    )
})
return(
<ul>
    {renderComments}
</ul>
)}