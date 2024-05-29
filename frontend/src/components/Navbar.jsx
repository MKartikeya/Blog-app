import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import Menu from './Menu';
import styles from '../css/navbar.module.css';


const NavBar = () => {
    const { user } = useContext(UserContext);
    const [menu, setMenu] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const loc = useLocation().pathname;
    const showMenu = () => {
        setMenu(!menu);
    }


    return (
        <div>
            <div className={`"flex items-center justify-between   py-4" ${styles.outer}`}>
                <h1 className={`" md:text-5xl font-extrabold" } ${styles.mainname}`}><Link style={{ textDecoration: "none" }} to="/">BlogHub</Link></h1>
                {loc === "/" && <div className={` ${styles.sicon}`}>
                    <p onClick={() => navigate(query ? "?search=" + query : "/")} className="cursor-pointer"><BsSearch style={{ fontSize: "2rem", color: "#420ef0", fontWeight: "bolder" }} /></p>
                    <input onChange={(e) => setQuery(e.target.value)} style={{ outline: "none" }} className={`"outline-none px-3" ${styles.searchbar} `} type="text" placeholder="Search a post" />
                </div>}
                <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 px-6">
                    {user ? (<h3 className={styles.links}><Link style={{ textDecoration: "none" }} to='/write'>New Post</Link></h3>) : (<h3 className={styles.links}><Link style={{ textDecoration: "none" }} to='/login'>Login</Link></h3>)}
                    <h3 className={styles.homelinks}><Link style={{ textDecoration: "none" }} to='/'>Home</Link></h3>
                    {user ? <div onClick={showMenu}>
                        <p className="cursor-pointer relative"><FaBars style={{ fontSize: "2rem", color: "#420ef0" }} /></p>
                        {menu && <Menu />}
                    </div> : <h3 className={styles.links}><Link style={{ textDecoration: "none" }} to="/register">Register</Link></h3>}
                </div>
                <div onClick={showMenu} className="md:hidden text-lg">
                    <p><FaBars style={{ fontSize: "2rem", color: "#420ef0" }} /> </p>
                    {menu && <Menu />}
                </div>
            </div>
           {loc=="/" && <div  className=" py-3"  style={{ display:"flex", justifyContent:"center"}}>                <input onChange={(e) => setQuery(e.target.value)} style={{ outline: "none" }} className={`"outline-none px-3" ${styles.searchbar2} `} type="text" placeholder="Search a post" />
            </div>}
        </div>
    );
}

export default NavBar;