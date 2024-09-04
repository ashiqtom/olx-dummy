import React, { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import { AuthContext } from './store/Context'; 
import Post from './store/PostContext';


function App() {
    const { setUser } = useContext(AuthContext); 

    useEffect(() => {
        // authonticate and get ueer name call axio
        // firebase.auth().onauth((user)=>{
        //     setUser(user)
        // })
        setUser('hello')
    }); // Specify `user` as a dependency to avoid unnecessary logs

    return (
        <div>
            <Post>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} /> 
                        <Route path='/create' element={<Create />} />
                        <Route path='/view' element={<View />} />
                    </Routes>
                </Router>
            </Post>
        </div>
    );
}

export default App;
