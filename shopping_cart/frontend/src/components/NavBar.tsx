import React from 'react';
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logOutUser } from '../store/authSlice';

const NavBar: React.FC = () => {
  const { cartTotalQuantity } = useSelector(state => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <Link to='/'>
        <h2 className="shop-title">Online Shop</h2>
      </Link>
      <Link to='/cart' className="cart-link">
        <div className='nav-bag'>
          <FaShoppingBag className="bag-icon" />
          <span className='bag-quantity'>
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>

      {auth._id ? (
        <button className="auth-btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <div className="auth-buttons">
          <button className="auth-btn login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="auth-btn register-btn" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
