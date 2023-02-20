import Login from 'components/pages/Login/Login';
import Signup from 'components/pages/Signup/Signup';
import AuthContextProvider from 'contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home/Home';
import Verse from './components/pages/Verse/Verse';

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='home' element={<Home />} />
                    <Route path='verse' element={<Verse />} />
                    <Route path='recommendation' element={<Verse />} />
                    <Route path='notifications' element={<Verse />} />
                    <Route path='likes' element={<Verse />} />
                    <Route path='saves' element={<Verse />} />
                    <Route path='profile' element={<Verse />} />
                    <Route path='settings' element={<Verse />} />
                </Route>
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
