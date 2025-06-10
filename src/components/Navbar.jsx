import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🛒</span>
          QuickKart
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <>
                  <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
                    Cart ({getCartItemsCount()})
                  </Link>
                  <Link to="/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              <span className="nav-welcome">Hi, {user?.name || user?.email}</span>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>

        <div className="nav-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;