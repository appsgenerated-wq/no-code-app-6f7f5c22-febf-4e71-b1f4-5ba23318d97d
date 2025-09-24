import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }) => 
    `text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md font-medium ${isActive ? 'text-blue-600 bg-blue-50' : ''}`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              GourmetGo
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/recipes" className={navLinkClasses}>Recipes</NavLink>
          </nav>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button href="/dashboard" variant="secondary" size="sm">Dashboard</Button>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" size="sm">Sign In</Button>
                <Button href="/register" size="sm">Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;