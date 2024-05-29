import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { URL } from "../url";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../css/newpost.module.css'

const EditPost = () => {
    const postId = useParams().id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const addCategory = () => {
        if (category === '') {
            Swal.fire("Category cannot be empty!", "", "info")
            return;
        }
        setCategories([...categories, category]);
        setCategory('');
    }

    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/" + postId);
            setTitle(res.data.title);
            setDescription(res.data.desc);
            setCategories(res.data.categories);
            setFile(res.data.photo);

        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        // Check if the title and description are not empty
        if (title === "" || description === "") {
            Swal.fire("Title and Description cannot be empty!", "", "info");
            return;
        }
    
        // Construct the post object
        const post = {
            title: title,
            desc: description,
            username: user.username,
            userId: user._id,
            categories: categories,
        };
    
        // Add the file to the post if available
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;
            
            try {
                await axios.post(URL + "/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
    
        // Display a confirmation dialog before updating the post
        Swal.fire({
            title: "Do you want to update the post?",
            background: "#1a1a1a",
            color: "rgba(230, 230, 255, 0.864)",
            padding: "3rem",
            showDenyButton: true,
            confirmButtonText: "Update",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Make the PUT request to update the post
                    const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true });
                    navigate("/posts/post/" + res.data._id);
                    Swal.fire("Updated!", "", "success");
                } catch (err) {
                    console.log(err);
                }
            } else if (result.isDenied) {
                Swal.fire("Update rejected", "", "info");
            } else {
                Swal.fire("Update Cancelled", "", "info");
            }
        });
    };
    

    const deleteCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    }

    useEffect(() => {
        fetchPost();
    }, []);


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "rgb(15,18, 23)"

        }}>
            <NavBar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className={styles.titletxt} >Update a post</h1>
                <form onSubmit={handleUpdate} className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className={styles.input} />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4 py-4 text-lg text-white rounded-sm font-extrabold  w-[100%] md:w-[300px]' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }} />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter post category' type="text" />
                            <div onClick={addCategory} className='bg-black text-white px-10 py-4 text-xl font-semibold cursor-pointer rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }}>Add</div>
                        </div>
                        <div className='grid space-y-1 md:flex px-4 mt-3'>
                            {categories?.map((cat, index) => (
                                <div key={index} className='flex justify-center items-center space-x-2 px-2  mr-4 md:px-6 py-1 md:py-3 text-lg rounded-md' style={{ backgroundColor: "rgb(146, 176, 242)" }}>
                                    <p>{cat}</p>
                                    <p onClick={() => deleteCategory(index)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ReactQuill value={description} onChange={setDescription} className={styles.input} />
                    <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-4 md:text-xl text-lg rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }}>Update</button>
                </form>
            </div>
            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

export default EditPost;
