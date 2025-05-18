import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import RequireUser from './components/auth/RequireUser';
import RequireVisitor from './components/auth/RequireVisitor';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import BlogForm from './pages/BlogForm';
import Viewer from './pages/Viewer';

function App() {
  return (
    <div className='font-poppins w-screen min-h-screen bg-gray-200'>
      <Routes>
        <Route element={<RequireUser />}>
          <Route index path='/' element={<Home />} />
          <Route path='/blog/new' element={<BlogForm />} />
          <Route path='/blog/edit' element={<BlogForm />} />
          <Route path='/blog/view' element={<Viewer />} />
        </Route>

        <Route element={<RequireVisitor />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
