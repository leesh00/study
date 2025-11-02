import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import Button from './components/Button'
import Header from './components/Header'

function App() {
  return (
    <> 
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/new' element={<New />}></Route>
        <Route path='/diary/:id' element={<Diary />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>
    </>
  );
}

export default App
