import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Comment from "../components/Comment";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styles from './postdetails.module.css'

const PostDetails = () => {
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId);
            setPost(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true })
            console.log(res.data)
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
    }
    const fetchComments = async () => {
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId, { withCredentials: true });
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const postComment = async () => {
        console.log("here");
        try {
            const res = await axios.post(URL + "/api/comments/create", { comment: comment, postId: postId, author: user.username, userId: user._id }, { withCredentials: true })

            console.log(res.data)
            window.location.reload();
            setComment("");
            fetchComments();
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchComments();
    }, [postId]);


    useEffect(() => {
        // if(user==null){
        //     console.log("here");
        //     navigate("/");
        // }
        fetchPost();
    }, [postId]);

    //function to check post.photo contains "http"


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "rgb(15,18, 23)"

        }}>
            <NavBar />
            <div className="px-8 md:px-[200px] mt-8">
                <div className=" flex justify-between items-center bg-slate-900 rounded-lg px-2">
                    <h1 className={styles.title}>{post.title}</h1>
                    {user && (user._id == post.userId) && <div className=" flex items-center justify-center space-x-4">
                        <p onClick={() => navigate("/edit/" + postId)} className=" cursor-pointer text-2xl font-bolder md:text-4xl text-green-500"><BiEdit /></p>
                        <p onClick={handleDelete} className="cursor-pointer font-bolder text-2xl md:text-4xl text-red-500"><MdDelete /></p>
                    </div>}
                </div>
                <div className=" flex items-center justify-between mt-2 md:mt-2">
                    <p className={styles.author}>@{post.username}</p>
                    <div className=" flex space-x-4">
                        <p className={styles.dates}>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p className={styles.dates}>{new Date(post.updatedAt).toString().slice(15, 24)}</p>
                    </div>
                </div>

                <img src={IF + post.photo} className=" w-[90%] mx-auto mt-8" alt="" />
                <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p style={{ color:"white",fontSize:"1.25rem"}}>Categories:</p>
                    <div className="grid grid-cols-auto md:flex justify-center items-center space-y-1 md:space-x-2" >
                        {post.categories && post.categories.map((category, index) => (
                            <div key={index} className="bg-gray-300 text-lg md:text-xl rounded-lg text-black px-6 py-3 " style={{backgroundColor:"rgb(146, 176, 242)",}}>{category}</div>

                        ))}

                    </div>
                </div>
                <p className="mx-auto mt-8" style={{ fontSize: "1.25rem", color: "rgb(255,255,255,0.9)", fontWeight: "bold", backgroundColor: "rgb(28, 35, 60)", padding: "2rem", borderRadius: "0.5rem" }}>{post.desc}</p>
                <div className="flex flex-col mt-4">
                    <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                    {/* Comments */}
                    {comments.map((comment, index) => (
                        <Comment key={comment._id} c={comment} post={post} />
                    ))}
                    {/* <Comment /> */}
                    {/* <div className=" px-2 py-2 bg-gray-200 rounded-lg my-2">
                        <div className="flex items-center justify-between">
                            <h3 className=" font-bold text-gray-600"> First Author</h3>
                            <div className="flex justify-center items-center space-x-4">
                                <p className="text-gray-500">22May-2005</p>
                                <p className="text-gray-500">10:45</p>
                                <div className=" flex items-center justify-center space-x-2">
                                    <p><BiEdit /></p>
                                    <p><MdDelete /></p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
                    </div>
                    <div className=" px-2 py-2 bg-gray-200 rounded-lg my-2">
                        <div className="flex items-center justify-between">
                            <h3 className=" font-bold text-gray-600"> First Author</h3>
                            <div className="flex justify-center items-center space-x-4">
                                <p className="text-gray-500">22May-2005</p>
                                <p className="text-gray-500">10:45</p>
                                <div className=" flex items-center justify-center space-x-2">
                                    <p><BiEdit /></p>
                                    <p><MdDelete /></p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
                    </div> */}
                </div>
                {/* Write Comment */}
                <div className="w-full flex flex-col mt-4 md:flex-row">
                    <input onChange={(e) => setComment(e.target.value)} style={{marginRight:"1rem"}} type="text"  className={styles.input} placeholder="Write a comment" />
                    <button onClick={postComment} style={{background:"linear-gradient(45deg, rgb(247, 88, 155) , rgb(82, 54, 220))",padding:"1rem",fontSize:"1.25rem",borderRadius:"1rem",minWidth:"200px",color:"white",fontWeight:"bolder"}} className={styles.button}>Add Comment</button>
                </div>
            </div>

            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

export default PostDetails;