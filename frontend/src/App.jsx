import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/layouts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { HomePage } from './pages/Home';
import { Drinks } from './pages/Drinks';
import { Bakery } from './pages/Bakery';
import { Snacks } from './pages/Snacks';
import { Account } from './pages/Account';
import AuthContext from './context/Auth';
import { useState, useEffect } from 'react';
import { InforUser } from './pages/Infor';
import { Category } from './pages/Category';
import { Order } from './pages/Order';
import { Role } from './pages/Role';
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem cookie có chứa thông tin tài khoản không
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      navigate('/');
    }
  }, []);


  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainLayout />}>
            <Route exact path="/main/home" element={<HomePage />} />
            <Route path="/main/mangerment/drinks" element={<Drinks />} />
            <Route path="/main/mangerment/bakery" element={<Bakery />} />
            <Route path="/main/mangerment/snacks" element={<Snacks />} />
            <Route path="/main/mangerment/account" element={<Account />} />
            <Route path="/main/mangerment/role" element={<Role />} />
            <Route path="/main/mangerment/category" element={<Category />} />
            <Route path="/main/mangerment/infor" element={<InforUser />} />
            <Route path="/main/order" element={<Order />} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </>
  )
}

export default App;