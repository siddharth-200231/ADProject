import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (result.success) {
      onClose();
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="modal-content p-4">
      <div className="modal-header border-0 p-0 mb-4">
        <h2 className="modal-title">Login</h2>
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; 