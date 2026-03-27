import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Hardcoded bypass for demo purposes if someone types test@test.com
    if (email === 'test@test.com' && password === 'password') {
       navigate('/');
       return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-container">
        {/* Banner Section */}
        <div className="auth-banner">
          <ShoppingBag size={80} color="white" className="auth-banner-img" />
          <h2>Welcome Back!</h2>
          <p>Sign in to access your orders, saved items, and personalized recommendations.</p>
        </div>

        {/* Form Section */}
        <div className="auth-card">
          <h3>Sign In</h3>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>
          
          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="flex-between m-b-8">
                <label style={{marginBottom: 0}}>Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="divider"><span>OR</span></div>
          
          <button className="btn btn-outline google-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
            Continue with Google
          </button>
          
          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign up for free</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
