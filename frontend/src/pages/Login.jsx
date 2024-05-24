import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./login.module.css"; // Import the CSS module
import NavBar from "../components/Navbar";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false); null
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            console.log(email);
            console.log(password);
            const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
            setUser(res.data);
            console.log(res);
            setEmail(res.data.email);
            setPassword(res.data.password);
            setError(false);
            navigate("/");
        }
        catch (err) {
            setError(true);
            console.log(err);
        }
    }

    return (
        <div className=" z-10" style={{

        }}>
            {/* <NavBar /> */}
            <div
                style={{
                    backgroundImage: `url(https://media.gettyimages.com/id/1599072346/video/social-media-social-media-marketing-social-media-engagement-post-structure.jpg?s=640x640&k=20&c=W2hoTN214H3-knDWODTsbzsUI-fXPpNPRfXClv2Kk2k=)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                }}
            />
            <div style={{
                backgroundColor: "rgba(0,0,0,0.75)",
                position: "fixed",
                top: "0",
                bottom: "0",
                width: "100vw",
            }}></div>
            <div style={{
                position: "fixed",
                top: "5vh",
                display: "flex",
                justifyContent: "center",
                marginBottom: "5rem",
                width: "100%",
                alignItems: "center",
            }}>
                <div
                    className={styles.signinbox}
                >
                    <form className={`${styles.inputbox} `}>
                        <h2 style={{
                            textAlign: "center",
                            fontSize: "3.5em",
                            marginTop: "10%"

                        }} className={styles.gradienttext}>Sign In</h2>

                        <input
                            className={styles.boxes}
                            style={{
                                paddingLeft: "2rem",
                                paddingRight: "2rem",
                                outline: "none",
                                fontSize: "1.25em",
                            }}
                            id="email"
                            type="email"
                            placeholder="Email or phone number"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className={styles.boxes}
                            style={{
                                paddingRight: "2rem",
                                paddingLeft: "2rem",
                                outline: "none",
                                fontSize: "1.25em",
                            }}
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleLogin} className={`${styles.signinbtn} ${styles.boxes}`}>
                            Sign In
                        </button>
                        <div className={`${styles.text}  `} style={{
                            // display: "flex",
                            // justifyContent:"space-between"
                        }}>

                            <p className={styles.other}>New to BlogHub? Register yourself.</p>
                            <p className={styles.signuplink}
                            ><Link className={styles.signuplink} to="/register"> Register</Link></p>


                        </div>
                        <button onClick={() => navigate("/")} className={styles.gohome}><Link className={styles.nounderline} to="/"> Go back Home</Link></button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;