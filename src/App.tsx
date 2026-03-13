import { Route, Routes } from 'react-router'
import './App.css'
import { Cart, Auth, Home } from './pages'
import NavBar from './components/NavBar'
import ProductDetails from './pages/ProductDetails'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
