import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import React, { useContext, useState, useEffect } from "react";
import ProfilePost from "../components/ProfilePost";
import styles from './newpost.module.css'
import { UserContext } from "../context/UserContext";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Swal from "sweetalert2";
const Profile = () => {
    const { user } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [userBlogs, setUserBlogs] = useState([]);
    const { setUser } = useContext(UserContext);
    const fetchUser = async () => {
        try {
            const res = await axios.get(URL + "/api/users/" + user._id);
            setUserDetails(res.data);
            console.log(userDetails);
        }
        catch (err) {
            console.log(err);
        }
    }
    const fetchUserBlogs = async () => {
        try {
            const res = await axios.get(URL + "/api/posts/user/" + user._id, { withCredentials: true });

            setUserBlogs(res.data);
            // console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try {
            Swal.fire({
                title: "Do you want to delete your account?",
                background: "#1a1a1a",
                color: "rgba(230, 230, 255, 0.864)",
                padding: "3rem",
                showDenyButton: true,
                confirmButtonText: "Delete",
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res = await axios.delete(URL + "/api/users/" + user._id, user._id, { withCredentials: true })
                    console.log(res.data)
                    const res2 = await axios.get(URL + "/api/auth/logout", { withCredentials: true });
                    setUser(null);
                    //logging out the user
                    // setUser(null);
                    navigate("/")
                    Swal.fire("Account Deleted", "", "success");
                } else if (result.isDenied) {
                    return;
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchUser();
        fetchUserBlogs();
    }, [user])

    const updateProfile = async () => {
        try {
            const res = await axios.put(URL + "/api/users/" + user._id, { username: username, email: email }, { withCredentials: true });
            console.log(res.data);
            setUser(res.data);
            Swal.fire("Profile Updated", "", "success");
        }
        catch (err) {
            console.log(err);
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
            <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start justify-end" >
                <div className="flex flex-col md:w-[70%] w-full mt-2 md:mt-4" style={{ backgroundColor: "rgb(15,18, 23)" }}>
                    <h1 style={{ marginTop: "1rem", textAlign: "center", fontSize: "3rem" }} className={styles.titletxt}>Your posts:</h1>

                    {userBlogs && userBlogs.map((post) => (
                        <div key={post._id}>
                            <Link to={user ? `/posts/post/${post._id}` : "/login"} style={{ textDecoration: "none" }}>
                                <ProfilePost key={post._id} post={post} />
                            </Link>
                        </div>

                    ))}
                </div>
                <div className="md:sticky md:top-[200px]  flex justify-center md:justify-end items-start md:w-[40%] w-full md:items-end md:ml-3 " style={{ zIndex: "0", backgroundColor: "rgb(15,18, 23)" }}>
                    <div className=" flex flex-col space style={{-y-8 ">
                        <h1 style={{ textAlign: "center" }} className="text-4xl text-center text-white font-bold mb-4">Profile</h1>
                        {user && <input onChange={(e) => setUsername(e.target.value)} value={username} className={styles.input} style={{ outline: "none" }} placeholder={user.username} type="text" />}
                        {user && <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} style={{ outline: "none" }} placeholder={user.email} type="email" />}
                        <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                            <button onClick={updateProfile} className={styles.button} style={{ width: "100%", borderRadius: "1rem", color: "white", fontSize: "1.25rem" }}> Update</button>
                            <button onClick={handleDelete} className={styles.button} style={{ width: "100%", borderRadius: "1rem", color: "white", fontSize: "1.25rem" }}> Delete</button>
                        </div>
                        <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                            <p className={styles.info}>Regitered On:  {new Date(userDetails.createdAt).toString().slice(0, 15)}</p>
                            <p className={styles.info}>LastUpdated On:  {new Date(userDetails.updatedAt).toString().slice(0, 15)}</p>
                            <p className={styles.info} >{"Total posts:     " + `${userBlogs.length}`}</p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer style={{ marginTop: "auto" }} />
        </div>
    );
}

export default Profile;