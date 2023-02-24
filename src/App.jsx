import Login from 'components/pages/Login/Login';
import Signup from 'components/pages/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home/Home';
import Article from './components/pages/Article/Article';
import React from 'react';
import ArticleID from './components/pages/Articleid/ArticleID';
import Settings from './components/pages/Settings/Settings';
import Likes from './components/pages/Likes/Likes';
import Saves from './components/pages/Saves/Saves';
import Profile from './components/pages/Profile/Profile';
import AuthContextProvider from './contexts/AuthContext';
import MyProfile from './components/pages/MyProfile/MyProfile';

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='article' element={<Article />} />
                    <Route path='likes' element={<Likes />} />
                    <Route path='saves' element={<Saves />} />
                    <Route path='profile' element={<MyProfile />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='article/:id' element={<ArticleID />} />
                    <Route path='profile/:id' element={<Profile />} />
                </Route>
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
