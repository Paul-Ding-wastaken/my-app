import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../Views/Home'
import Login from './Components/Login'
import Register from '../Views/Register'
import GenreView from '../Views/Genres'
import DetailView from '../Views/Detail'
import Error from '../Views/Error';
import Search from '../Views/Search'
import Cart from '../Views/Cart'

function App() {

  return (


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Genres" element={<GenreView />} />
      <Route path="/Details/:id" element={<DetailView />} />
      <Route path="*" element={<Error />} />
      <Route path="/Search/:id" element={<Search />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>

  )
}

export default App
