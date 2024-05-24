import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import styles from './newpost.module.css'
import Swal from "sweetalert2";

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const addCategory = () => {
        if(category == ''){
            Swal.fire("Category cannot be empty!", "", "info")
            return;
        }
        let curCats = [...categories];
        curCats.push(category);
        setCategories(curCats);
        setCategory('');
    }
    const deleteCategory = (index) => {
        console.log("icd");
        let curCats = [...categories];
        curCats.splice(index, 1);
        setCategories(curCats);
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        if (title == "" || description == "") {
            console.log("empty")
            Swal.fire("Title and Description cannot be empty!", "", "info")
            return;
        }
        const post = {
            title: title,
            desc: description,
            username: user.username,
            userId: user._id,
            categories: categories,
        }

        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            post.photo = filename
            // console.log(data)
            //img upload
            try {
                const imgUpload = await axios.post(URL + "/api/upload", data)
                console.log(imgUpload.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        //post upload
        // console.log(post)
        try {
            Swal.fire({
                title: "Do you want to create this post?",
                background: "#1a1a1a",
                color: "rgba(230, 230, 255, 0.864)",
                padding: "3rem",
                showDenyButton: true,
                denyButtonText: "Cancel",
                showCancelButton: true,
                confirmButtonText: "Create",
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true })
                    navigate("/posts/post/" + res.data._id)
                    console.log(res.data)
                    Swal.fire("Post Created!", "", "success");
                } else if (result.isDenied) {
                    // Swal.fire("Post Creation Cancelled", "", "info");
                }
                else {
                    navigate('/');
                    Swal.fire("Post Creation Cancelled", "", "info");
                }
            });


        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "rgb(15,18, 23)"
        }}>
            <NavBar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className={styles.title} >Create a post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4' onSubmit={handleCreate}>
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.input} type="text" placeholder='Enter post title' />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4 py-4 text-lg text-white rounded-sm font-extrabold  w-[100%] md:w-[300px]' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }} />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter post category' type="text" />
                            <div onClick={addCategory} className='bg-black text-white px-10 py-4 text-xl font-semibold cursor-pointer rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }}>Add</div>
                        </div>
                        {/* Categories */}
                        <div className='grid space-y-1 md:flex px-4 mt-3'>
                            {categories?.map((cat, index) => {
                                return (<div key={index} className='flex justify-center items-center space-x-2 mr-4 px-6 py-3 text-lg rounded-md' style={{ backgroundColor: "rgb(146, 176, 242)" }}>
                                    <p>{cat}</p>
                                    <p onClick={() => deleteCategory(index)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                </div>);
                            })}
                        </div>


                    </div>
                    <textarea className={styles.input} onChange={(e) => setDescription(e.target.value)} rows={15} cols={30} placeholder='Enter post description' />
                    <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-4 md:text-xl text-lg rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155) , rgb(82, 54, 220))" }}>Create</button>

                </form>

            </div>
            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

export default CreatePost;