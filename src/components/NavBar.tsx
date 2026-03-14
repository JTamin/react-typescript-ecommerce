import { Link } from "react-router"
import '../App.css'
import { authContext } from "../context/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
const NavBar = () => {
    const { currentUser, logout } = authContext();
    const navigate = useNavigate()

    let isLoggedIn = !!currentUser
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])

    return (
        <div>
            <nav className="nav-container">
                <div>
                    <Link to='/' className="nav-brand">ShopPayLess</Link>
                </div>
                <div className="nav-breadcrumbs">
                    <Link to='/' className="nav-breadcrumbs-link">
                        Home
                    </Link>
                    <Link to='/Cart' className="nav-breadcrumbs-link">Cart</Link>
                </div>
                <div className="nav-auth-link">
                    {isLoggedIn && <p>{currentUser?.email}</p>}
                    {isLoggedIn ? <>
                        <button className="logout-btn" onClick={() => {
                            logout()
                            isLoggedIn = false
                        }}>Logout</button>
                    </> : <Link to='/auth' className="nav-btn-link">Sign in</Link>}
                </div>
            </nav>
        </div>
    )
}

export default NavBar
