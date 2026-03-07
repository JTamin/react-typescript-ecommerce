import { Route, Routes } from 'react-router'
import './App.css'
import { About, Auth, Home } from './pages'
import NavBar from './components/NavBar'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/Auth' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
