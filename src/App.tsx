import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import { Cart, Auth, Home, ProductDetails } from './pages'
import NavBar from './components/NavBar'
function App() {
  const location = useLocation();
  return (
    <>

      {location.pathname !== "/Auth" && <NavBar />}
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
