import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';
import styles from './footer.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const {user} = useContext(UserContext);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = async() =>{
        try{
            Swal.fire({
                title: "Do you want to logout?",
                background: "#1a1a1a",
                color: "rgba(230, 230, 255, 0.864)",
                paddingX: "2rem",
                paddingY: "15rem",
                showDenyButton: true,
                denyButtonText: "Cancel",
                // showCancelButton: true,
                confirmButtonText: "Logout",
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res= await axios.get(URL+"/api/auth/logout",{withCredentials:true});
                    console.log(res.data);
                    setUser(null);
                    navigate('/');
                  Swal.fire("Logged Out!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Logout Cancelled", "", "info");
                }
              });

        } catch (err){
            console.log(err);
        }
    }

    return (
        <div className={styles.menubox}>

            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}} ><Link to="/login" className={styles.menulinks} style={{textDecoration:"none"}}>Login</Link></h3>}
            {!user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}}><Link to="/register" className={styles.menulinks} style={{textDecoration:"none"}}>Register</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}}><Link to="/profile" className={styles.menulinks} style={{textDecoration:"none"}}>Profile</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}}><Link to="/write" className={styles.menulinks} style={{textDecoration:"none"}}>Write</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}}><Link to="/profile" className={styles.menulinks} style={{textDecoration:"none"}}>MyBlogs</Link></h3>}
            {user && <h3 onClick={handleLogOut} className=" text-sm cursor-pointer px-4 py-3" style={{fontSize:"1.25rem"}}><p  style={{color:"rgb(255, 42, 0)", fontWeight:"bolder"}} >LogOut</p></h3>}




        </div>
    );
}

export default Menu;