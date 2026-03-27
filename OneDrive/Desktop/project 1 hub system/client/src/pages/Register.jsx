import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    setLoading(true);
    setError('');
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-container" style={{flexDirection: 'row-reverse'}}>
        {/* Banner Section */}
        <div className="auth-banner" style={{background: 'linear-gradient(135deg, #1877F2 0%, #0056b3 100%)'}}>
          <UserPlus size={80} color="white" className="auth-banner-img" />
          <h2>Join Our Platform</h2>
          <p>Create an account to browse thousands of products and safely checkout.</p>
        </div>

        {/* Form Section */}
        <div className="auth-card">
          <h3>Create an Account</h3>
          <p className="auth-subtitle">Sign up now to get exclusive access to our deals.</p>
          
          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div style={{display: 'flex', gap: '16px'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Repeat password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="divider"><span>OR</span></div>
          
          <button className="btn btn-outline google-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
            Sign up with Google
          </button>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
