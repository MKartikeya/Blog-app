import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Comment = ({ c,post }) => {
    const comment = c;
    const {user} = useContext(UserContext)
    console.log(comment)
    const deleteComment = async () => {
        try {
            const res = await axios.delete(URL + "/api/comments/" + comment._id, { withCredentials: true });
            console.log(res.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }


    } 
    const editComment = async()=>{
        const { value: newcom } = await Swal.fire({
            title: "Edit Comment",
            input: "text",
            inputLabel: "New comment",
            background: "#1a1a1a",
            color: "rgba(230, 230, 255, 0.864)",
            inputPlaceholder: "Enter the comment you want to replace with"
          });
          if (newcom) {
            Swal.fire({
                title: "Do you want to edit the comment?",
                background: "#1a1a1a",
                color: "rgba(230, 230, 255, 0.864)",
                padding: "3rem",
                showDenyButton: true,
                confirmButtonText: "Edit",
                padding:"1rem"
                // showCancelButton: true,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    try{
                        const res = await axios.put(URL + "/api/comments/"+comment._id, { comment: newcom, postId: post._id, author: user.username, userId: user._id }, { withCredentials: true })
                        console.log(res.data)
                        window.location.reload();
                        Swal.fire("Updated!", "", "success");
                    } catch(err){
                        Swal.fire("Some error occurred", "", "error");
                        console.log(err);
                    }
                }
                else if (result.isDenied) {
                    Swal.fire("Update cancelled", "", "info");
                }

            })
          }
    }
    return (<div className=" px-2 py-2 rounded-lg my-2" style={{backgroundColor:"rgba(232, 218, 255, 0.742)"}}>
        <div className="flex items-center justify-between">
            <h3 className=" font-bold text-gray-600">@{comment.author}</h3>
            <div className="flex justify-center items-center space-x-4">
                <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(comment.updatedAt).toString().slice(15, 24)}</p>
                {user && (user._id == comment.userId) &&
                <div className=" flex items-center justify-center space-x-2">
                    <p onClick={editComment} style={{color:"rgba(35, 190, 60, 0.982)"}}><BiEdit /></p>
                    <p className=" cursor-pointer text-red-700" onClick={deleteComment}><MdDelete /></p>
                </div>}
            </div>
        </div>
        <p className="mt-2 text-bkack-600">{comment.comment}</p>
    </div>
    );
}

export default Comment;