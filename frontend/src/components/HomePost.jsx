import React from 'react';
import { IF } from '../url';
import styles from "../css/homepost.module.css";

const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
};

const HomePosts = ({ post }) => {
    const textDescription = stripHtml(post.desc);

    return (
        <div style={{
            marginTop: "5vh",
            marginBottom: "3vh",
            display: "flex",
            backgroundColor: "rgba(46, 46, 64,0.55)",
            borderRadius: "1rem",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            paddingRight: "1rem",
        }} className="w-full md:flex-row flex-col space-x-4">
            {/* left part */}
            <div className="md:w-[45%] px-0.5 w-[77vw] md:h-[400px] flex justify-center mx-4 items-center my-2">
                <img className="md:h-[400px] rounded-xl" src={IF + post.photo} alt="" />
            </div>
            {/* right part */}
            <div className="flex flex-col md:w-[65%] justify-center align-center w-[78vw] space-x-2 space-y-2 md:space-y-8">
                <h1 className={styles.gradienttext}>
                    {post.title}
                </h1>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
                    <p className={styles.author}>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p className={styles.dates}>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p className={styles.dates}>{new Date(post.updatedAt).toString().slice(15, 21)}</p>
                    </div>
                </div>
                <p className={styles.desc}>{textDescription.slice(0, 200) + " ..Read more"}</p>
            </div>
        </div>
    );
};

export default HomePosts;
