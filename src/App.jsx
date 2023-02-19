import Login from 'components/pages/Login/Login';
import Signup from 'components/pages/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home/Home';
import Article from './components/pages/Article/Article';
import React from 'react';
import ArticleID from './components/pages/Articleid/ArticleID';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='home' element={<Home />} />
                    <Route path='article' element={<Article />} />
                    <Route path='recommendation' element={<Article />} />
                    <Route path='notifications' element={<Article />} />
                    <Route path='likes' element={<Article />} />
                    <Route path='saves' element={<Article />} />
                    <Route path='profile' element={<Article />} />
                    <Route path='settings' element={<Article />} />
                    <Route path='article/:id' element={<ArticleID />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
