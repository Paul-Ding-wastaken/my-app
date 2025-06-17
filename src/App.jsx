import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../Views/Home'
import Login from '../Views/Login'
import Register from '../Views/Register'
import GenreView from '../Views/Genres'
import DetailView from '../Views/Detail'
import Error from '../Views/Error';
import Search from '../Views/Search'
import Cart from '../Views/Cart'
import Settings from '../Views/Settings'
import ProtectedRoute from './ProtectedRoutes';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  console.log("App is rendering at path:", location.pathname);


  return (


    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/Genres" element={<GenreView />} />
      <Route path="/Details/:id" element={<DetailView />} />
      <Route path="*" element={<Error />} />
      <Route path="/Search/:id" element={<Search />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Settings" element={<Settings />} />
      </Route>
      
    </Routes>

  )
}

export default App
