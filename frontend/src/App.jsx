import MainLayout from './components/layouts'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      <MainLayout />
    </>
  )
}

export default App
