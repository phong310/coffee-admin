import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { HomePage } from './pages/Home';
import { Drinks } from './pages/Drinks';
import { Bakery } from './pages/Bakery';
import { Snacks } from './pages/Snacks';
import { Account } from './pages/Account';

function App() {

  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainLayout />}>
          <Route exact path="/main/home" element={<HomePage />} />
          <Route path="/main/mangerment/drinks" element={<Drinks />} />
          <Route path="/main/mangerment/bakery" element={<Bakery />} />
          <Route path="/main/mangerment/snacks" element={<Snacks />} />
          <Route path="/main/mangerment/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
