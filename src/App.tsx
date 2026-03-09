import { Route, Routes } from 'react-router'
import './App.css'
import { Cart, Auth, Home } from './pages'
import NavBar from './components/NavBar'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Auth' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
