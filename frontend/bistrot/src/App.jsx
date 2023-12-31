import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicial from './pages/inicial/inicial';
import Cadastro from './pages/cadastro/cadastro';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicial />}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
