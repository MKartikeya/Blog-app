import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom"; // Import useNavigate for navigation
import NavBar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import styles from "../css/login.module.css"; // Import the CSS module


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();



    const handleRegister = async () => {

        try {
            const res = await axios.post(URL + "/api/auth/register", { username, email, password })
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setError(false)
            navigate("/login")

        }
        catch (err) {
            setError(true)
            console.log(err)
        }

    }

    return (
        <div className=" z-10">
            {/* <NavBar /> */}
            <div
                style={{
                    backgroundImage: `url(https://media.gettyimages.com/id/1599072346/video/social-media-social-media-marketing-social-media-engagement-post-structure.jpg?s=640x640&k=20&c=W2hoTN214H3-knDWODTsbzsUI-fXPpNPRfXClv2Kk2k=)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    backgroundColor: "black",
                }}
            />
            <div className={styles.bg} style={{
                backgroundColor: "rgba(0,0,0,0.75)", position: "fixed",
                top: "0",
                bottom: "0",
                width: "100vw"
            }}>
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
                        <form className={styles.inputbox} >
                            <h2 className={styles.gradienttext} style={{
                                textAlign: "center",
                                fontSize: "3.5em",
                                marginTop: "10%"

                            }} >Register</h2>
                            <input
                                className={styles.boxes}
                                style={{ outline: "none" }}
                                placeholder="Enter a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                style={{ outline: "none" }}
                                className={styles.boxes}
                                id="email"
                                type="email"
                                placeholder="Email or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                style={{ outline: "none" }}
                                className={styles.boxes}
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" className={`${styles.signinbtn} ${styles.boxes}`} onClick={handleRegister}>
                                Register
                            </button>
                            {error && <h3 style={{ color: "red" }}>Something went wrong</h3>}
                            <div >

                                <p className={styles.other}>Already have an account ? Login yourself .</p>
                                <p className={styles.signuplink}
                                ><Link className={styles.signuplink} to="/login"> Login</Link></p>

                            </div>
                            <button onClick={() => navigate("/")} className={styles.gohome}><Link style={{textDecoration:"none"}} to="/"> Go back Home</Link></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;