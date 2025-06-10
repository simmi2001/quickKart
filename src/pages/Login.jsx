import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = isAdminLogin 
        ? await authAPI.adminLogin(formData)
        : await authAPI.login(formData);

      const { token } = response.data;
      const userData = response.data.user || response.data.admin;
      
      login(userData, token, isAdminLogin);
      navigate(isAdminLogin ? '/admin' : '/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isAdminLogin ? 'Admin Login' : 'Login to QuickKart'}</h2>
          
          <div className="login-toggle">
            <button
              className={!isAdminLogin ? 'active' : ''}
              onClick={() => setIsAdminLogin(false)}
            >
              Customer
            </button>
            <button
              className={isAdminLogin ? 'active' : ''}
              onClick={() => setIsAdminLogin(true)}
            >
              Admin
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={isAdminLogin ? 'admin@quickkart.com' : 'Enter your email'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={isAdminLogin ? 'admin123' : 'Enter your password'}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {!isAdminLogin && (
            <p className="auth-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          )}

          {isAdminLogin && (
            <p className="admin-demo-info">
              Demo credentials: admin@quickkart.com / admin123
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;