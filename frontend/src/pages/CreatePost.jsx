import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from "react";
import styles from '../css/newpost.module.css'

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [prompt, setPrompt] = useState("Global warming"); // State to hold the prompt input value

    const navigate = useNavigate();

    const addCategory = () => {
        if (category === '') {
            Swal.fire("Category cannot be empty!", "", "info");
            return;
        }
        setCategories([...categories, category]);
        setCategory('');
    };

    const deleteCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleGenerateText = async () => {
        setLoading(true);
        setError('');
        //taking prompt input  using swal 
        const { value: prompt } = await Swal.fire({
            title: 'Enter a prompt',
            input: 'text',
            inputLabel: 'Prompt',
            inputPlaceholder: 'Enter your prompt',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        });
        if (!prompt) {
            setLoading(false);
            return;
        }
        setPrompt(prompt);

        try {
            // 
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + "AIzaSyABm9NAdyhUocb2jKavwy4hoK6H0hTC8ds",
                method: 'POST',
                data: {
                    contents: [
                        { parts: [{ text: "Generate a nicely formatted blog in HTML on " + prompt }] },
                    ],
                },
            });
            if (response.data.candidates.length > 0) {
                let content = response.data.candidates[0].content.parts[0].text;
                content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
                content = content.replace('```html', '');
                content = content.replace('```', '');

                setDescription(description + content);
            }


        } catch (err) {
            setError('Error generating text');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    const handleCreate = async (e) => {
        e.preventDefault();
        if (title === "" || description === "") {
            Swal.fire("Title and Description cannot be empty!", "", "info");
            return;
        }
        const post = {
            title: title,
            desc: description,
            username: user.username,
            userId: user._id,
            categories: categories,
            // upvotes: [],
        };

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
            }
            catch (err) {
                console.log(err)
            }
        }
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
                if (result.isConfirmed) {
                    const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
                    navigate("/posts/post/" + res.data._id);
                    Swal.fire("Post Created!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Post Creation Cancelled", "", "info");
                } else {
                    navigate('/');
                    Swal.fire("Post Creation Cancelled", "", "info");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "rgb(15,18, 23)"
        }}>
            <NavBar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className={styles.title}>Create a post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4' onSubmit={handleCreate}>
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.input} type="text" placeholder='Enter post title' />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4 py-4 text-lg text-white rounded-sm font-extrabold w-[100%] md:w-[300px]' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155), rgb(82, 54, 220))" }} />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter post category' type="text" />
                            <div onClick={addCategory} className='bg-black text-white px-10 py-4 text-xl font-semibold cursor-pointer rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155), rgb(82, 54, 220))" }}>Add</div>
                        </div>
                        <div className='grid space-y-1 md:flex px-4 mt-3'>
                            {categories?.map((cat, index) => (
                                <div key={index} className='flex justify-center items-center space-x-2 mr-4 px-6 py-3 text-lg rounded-md' style={{ backgroundColor: "rgb(146, 176, 242)" }}>
                                    <p>{cat}</p>
                                    <p onClick={() => deleteCategory(index)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ReactQuill value={description} onChange={setDescription} modules={CreatePost.modules} formats={CreatePost.formats} className={styles.input} />
                    <button type="button" onClick={handleGenerateText} disabled={loading} className='px-4 py-2 bg-blue-500 text-white rounded-md'>
                        {loading ? 'Generating...' : 'Generate Text'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-4 md:text-xl text-lg rounded-md' style={{ background: "linear-gradient(90deg, rgb(247, 88, 155), rgb(82, 54, 220))" }}>Create</button>
                </form>
            </div>
            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

CreatePost.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['image', 'link'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ],
};

CreatePost.formats = [
    'header', 'font',
    'list', 'bullet',
    'bold', 'italic', 'underline',
    'image', 'link',
    'align',
    'color', 'background'
];

export default CreatePost;
