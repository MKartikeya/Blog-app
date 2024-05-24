import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import HomePosts from '../components/HomePost';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { URL } from '../url';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import BigHomePosts from '../components/BigHomePost';

const Home = () => {
    const { search } = useLocation();
    const {user} = useContext(UserContext)

    const [posts, setPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [search]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(URL + "/api/posts/" + search);
            console.log(res.data);
            setPosts(res.data);
            if (res.data.length === 0) {
                setNoPosts(true);
            } else {
                setNoPosts(false);
            }
            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: "rgb(15,18, 23)"
        }}>
            <NavBar />
            <div className="px-8 md:px-[200px]">
                {isLoading ? <Loader /> : !noPosts ? posts.map((post) => (
                    <div key={post._id}>
                        <Link  to={user ? `/posts/post/${post._id}` : "/login"} style={{textDecoration:"none"}}>
                            {/* <BigHomePosts key={post._id} post={post} /> */}
                            <HomePosts key={post._id} post={post} />
                        </Link>
                    </div>
                )) : <h1 className="text-2xl font-bold text-center mt-8">No Posts Found</h1>}
                {/* <HomePosts/>
            <HomePosts/>
            <HomePosts/>
            <HomePosts/>
            <HomePosts/>
            <HomePosts/> */}
            </div>
            <Footer />
        </div>
    );
}

export default Home;