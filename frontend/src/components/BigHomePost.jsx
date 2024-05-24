import React from 'react';
import {IF} from '../url'
import styles from './homepost.module.css'
const BigHomePosts = ({post}) => {
    return ( 
        <div style={{
            marginTop: "2.5vh",
            width:"100%",
            marginBottom: "5vh",
            display:"flex",
            flexDirection:"column",
            backgroundColor:"rgba(46, 46, 64,0.55)",
            borderRadius:"1rem",
            paddingTop:"5rem",
            paddingBottom:"2rem",
        }} className="w-full hidden flex-col  space-x-4" >
            {/* left part */}
            <div className="  px-0.5  md:h-[600px] flex justify-center mx-4 items-center my-2">
                <img className=" md:h-[600px] rounded-xl" src={IF+post.photo} alt="" />

            </div>
            {/* right part */}
            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:"1rem",
                alignItems:"center",

            }}>
                <h1 className={styles.gradienttext} style={{fontSize:"3rem"}} >
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
 
export default BigHomePosts;