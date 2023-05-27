import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/layouts';
import { Account } from './pages/Account';
import { Bakery } from './pages/Bakery';
import { Category } from './pages/Category';
import Permission from './pages/Create_Permission';
import { Drinks } from './pages/Drinks';
import { Forbidden } from './pages/Forbidden';
import { HomePage } from './pages/Home';
import { InforUser } from './pages/Infor';
import Login from './pages/Login';
import { Order } from './pages/Order';
import { Role } from './pages/Role';
import { Snacks } from './pages/Snacks';
import Newss from './pages/Newss';

function App() {
  // const [user, setUser] = useState(false);
  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      {/* <AuthContext.Provider value={{ user, setUser }}> */}
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
          <Route path="/main/news" element={<Newss />} />
          <Route path="/main/order" element={<Order />} />
          <Route path="/main/forbidden" element={<Forbidden />} />
        </Route>
      </Routes>
      {/* </AuthContext.Provider> */}
    </>
  )
}

export default App;