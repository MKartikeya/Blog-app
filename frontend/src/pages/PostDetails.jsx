import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Comment from "../components/Comment";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa"; // Import the thumbs-up icon
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import DOMPurify from 'dompurify';
import Loader from '../components/Loader';
import styles from '../css/postdetails.module.css';
import Swal from "sweetalert2";

const PostDetails = () => {
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [hasUpvoted, setHasUpvoted] = useState(false); // State to track if user has upvoted
    const navigate = useNavigate();

    const fetchPost = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(URL + "/api/posts/" + postId);
            setPost(res.data);
            setUpvotes(res.data.upvotes.length);
            setHasUpvoted(res.data.upvotes.some(upvote => upvote === user._id)); // Check if user has upvoted            console.log(hasUpvoted);
            console.log(res.data.upvotes)
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        // setIsLoading(true);
        try {
            Swal.fire({
                title: "Do you want to delete this post?",
                background: "#1a1a1a",
                color: "rgba(230, 230, 255, 0.864)",
                showDenyButton: true,
                confirmButtonText: "Delete",
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
            const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
            navigate("/");
            Swal.fire("Post Deleted!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Delete Cancelled", "", "info");
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
        // setIsLoading(false);
    };

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId, { withCredentials: true });
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const postComment = async () => {
        try {
            const res = await axios.post(URL + "/api/comments/create", { comment: comment, postId: postId, author: user.username, userId: user._id }, { withCredentials: true });
            setComment("");
            fetchComments();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpvote = async () => {
        try {
            const res = await axios.post(URL + "/api/posts/upvote", { postId: postId, userId: user._id }, { withCredentials: true });
            if (res.data.success) {
                setHasUpvoted(!hasUpvoted);
                fetchPost();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId,user]);

    useEffect(() => {
        fetchPost();
    }, [postId,user]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "rgb(15,18, 23)"
        }}>
            <NavBar />
            {isLoading ? <Loader /> :
                <div className="px-8 md:px-[200px] mt-8">
                    <div className="flex justify-between items-center bg-slate-900 rounded-lg px-2">
                        <h1 className={styles.title}>{post.title}</h1>
                        {user && (user._id === post.userId) && (
                            <div className="flex items-center justify-center space-x-4">
                                <p onClick={() => navigate("/edit/" + postId)} className="cursor-pointer text-2xl font-bolder md:text-4xl text-green-500"><BiEdit /></p>
                                <p onClick={handleDelete} className="cursor-pointer font-bolder text-2xl md:text-4xl text-red-500"><MdDelete /></p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-2">
                        <p className={styles.author}>@{post.username}</p>
                        <div className="flex space-x-4">
                            <p className={styles.dates}>{new Date(post.updatedAt).toDateString()}</p>
                            <p className={styles.dates}>{new Date(post.updatedAt).toTimeString().slice(0, 5)}</p>
                        </div>
                    </div>

                    <img src={IF + post.photo} className="w-[90%] mx-auto mt-0 md:mt-8" alt="" />
                    <div className="flex items-center mt-8 space-x-4 font-semibold">
                        <p style={{ color: "white", fontSize: "1.25rem" }}>Categories:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center">
                            {post.categories && post.categories.map((category, index) => (
                                <div key={index} className="bg-gray-300 text-lg md:text-xl rounded-lg text-black px-6 py-3" style={{ backgroundColor: "rgb(146, 176, 242)" }}>
                                    {category}
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="mx-auto mt-8 text-lg" style={{ color: "rgb(255,255,255,0.9)", fontWeight: "bold", backgroundColor: "rgb(28, 35, 60)", padding: "2rem", borderRadius: "0.5rem" }}>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <h3 className="font-semibold text-xl text-white">Comments:</h3>
                        <button onClick={handleUpvote} className={`flex items-center justify-center space-x-2 p-2 rounded-md ${hasUpvoted ? 'bg-red-500' : 'bg-gray-500'}`}>
                            <FaThumbsUp className="text-white" />
                            <span className="text-white font-bold">{hasUpvoted ? `${upvotes} Upvotes` : 'Upvote'}</span>
                        </button>
                    </div>
                    <div className="flex flex-col mt-4">
                        {comments.map((comment, index) => (
                            <Comment key={comment._id} c={comment} post={post} />
                        ))}
                    </div>
                    <div className="w-full flex flex-col mt-4 md:flex-row">
                        <input onChange={(e) => setComment(e.target.value)} style={{ marginRight: "1rem" }} type="text" className={styles.input} placeholder="Write a comment" value={comment} />
                        <button onClick={postComment} style={{ background: "linear-gradient(45deg, rgb(247, 88, 155), rgb(82, 54, 220))", padding: "1rem", fontSize: "1.25rem", borderRadius: "1rem", minWidth: "200px", color: "white", fontWeight: "bolder" }} className={styles.button}>Add Comment</button>
                    </div>
                </div>
            }
            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

export default PostDetails;
