import React from 'react';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import { UserContextProvider } from './context/UserContext';



const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/posts/post/:id" element={<PostDetails/>} />
        <Route exact path="/write" element={<CreatePost/>} />
        <Route exact path="/edit/:id" element={<EditPost/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;