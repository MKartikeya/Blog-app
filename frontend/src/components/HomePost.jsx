import React from 'react';
import {IF} from '../url'
import styles from './homepost.module.css'
const HomePosts = ({post}) => {
    return ( 
        <div style={{
            marginTop: "7.5vh",
            marginBottom: "5vh",
            display:"flex",
            backgroundColor:"rgba(46, 46, 64,0.55)",
            borderRadius:"1rem",
            paddingTop:"2rem",
            paddingBottom:"2rem",
        }} className="w-full md:flex-row flex-col  space-x-4" >
            {/* left part */}
            <div className=" md:w-[45%] px-0.5 w-[80vw] md:h-[400px] flex justify-center mx-4 items-center my-2">
                <img className=" md:h-[400px] rounded-xl" src={IF+post.photo} alt="" />

            </div>
            {/* right part */}
            <div className="flex flex-col md:w-[65%] justify-center align-center w-[80vw] space-x-2 space-y-2 md:space-y-8">
                <h1 className={styles.gradienttext} >
                    {post.title}
                </h1>
                <div className=" flex mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
                    <p className={styles.author}>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p className={styles.dates} >{new Date(post.updatedAt).toString().slice(0,15)}</p>
                        <p className={styles.dates} >{new Date(post.updatedAt).toString().slice(15,21)}</p>
                    </div>
                </div>
                <p className={styles.desc}> {post.desc.slice(0,200)+" ..Read more"}</p>

            </div>

        </div>
     );
}
 
export default HomePosts;