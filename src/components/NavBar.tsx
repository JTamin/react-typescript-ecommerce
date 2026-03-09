import { Link } from "react-router"
import '../App.css'

const NavBar = () => {
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
                    <Link to='/Auth' className="nav-btn-link">Sign In</Link>

                </div>
            </nav>
        </div>
    )
}

export default NavBar
