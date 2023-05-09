import { message } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/layouts';
import AuthContext from './context/Auth';
import { Account } from './pages/Account';
import { Bakery } from './pages/Bakery';
import { Category } from './pages/Category';
import Permission from './pages/Create_Permission';
import { Drinks } from './pages/Drinks';
import { HomePage } from './pages/Home';
import { InforUser } from './pages/Infor';
import Login from './pages/Login';
import { Order } from './pages/Order';
import { Role } from './pages/Role';
import { Snacks } from './pages/Snacks';
import { Forbidden } from './pages/Forbidden';

function App() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  // const pathName = window.location.pathname;
  // const userCookie = Cookies.get('user');

  // useEffect(() => {
  //   // Kiểm tra xem cookie có chứa thông tin tài khoản không
  //   if (userCookie) {
  //     setUser(JSON.parse(userCookie));
  //   } else {
  //     navigate('/');
  //   }
  // }, []);

  // useEffect(() => {
  //   // Kiểm tra quyền
  //   if (userCookie) {
  //     const userInfo = JSON.parse(userCookie);
  //     switch (pathName) {
  //       case "/main/mangerment/drinks":
  //         if (!userInfo.permission.includes("permission_allProduct") && !userInfo.permission.includes("Full_permission")) {
  //           message.warning("Không có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //         break;
  //       case "/main/mangerment/bakery":
  //         if (!userInfo.permission.includes("permission_allProduct") && !userInfo.permission.includes("Full_permission")) {
  //           message.warning("Không có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //         break;
  //       case "/main/mangerment/snacks":
  //         if (!userInfo.permission.includes("permission_allProduct") && !userInfo.permission.includes("Full_permission")) {
  //           message.warning("Không có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //         break;
  //       case "/main/mangerment/account":
  //         if (!userInfo.permission.includes("Full_permission")) {
  //           message.warning("Chỉ ADMIN có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //       case "/main/mangerment/role":
  //         if (!userInfo.permission.includes("Full_permission")) {
  //           message.warning("Chỉ ADMIN có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //       case "/main/mangerment/permission":
  //         if (!userInfo.permission.includes("Full_permission")) {
  //           message.warning("Chỉ ADMIN có quyền truy cập !")
  //           return navigate(-1)
  //         }
  //       case "/main/order":
  //         if (!userInfo.permission.includes("Full_permission") && !userInfo.permission.includes("permission_acountant")) {
  //           if (!userInfo.permission.includes("Full_permission")) {
  //             message.warning("Không có quyền truy cập !")
  //             return navigate(-1)
  //           }
  //         }
  //       default:
  //       // code block
  //     }
  //   }
  // }, [pathName])




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
            <Route path="/main/mangerment/permission" element={<Permission />} />
            <Route path="/main/mangerment/category" element={<Category />} />
            <Route path="/main/mangerment/infor" element={<InforUser />} />
            <Route path="/main/order" element={<Order />} />
            <Route path="/main/forbidden" element={<Forbidden />} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </>
  )
}

export default App;