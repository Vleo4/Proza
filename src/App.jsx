import Login from 'components/pages/Login/Login';
import Signup from 'components/pages/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home/Home';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='home' element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
