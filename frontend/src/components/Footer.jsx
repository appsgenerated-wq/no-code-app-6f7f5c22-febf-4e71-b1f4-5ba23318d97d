import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">GourmetGo</h3>
            <p className="text-gray-400 max-w-md">
              Your daily source for delicious recipes and culinary inspiration. Join our community and start sharing today!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wider uppercase">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-400 hover:text-white transition-colors">Recipes</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Join</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wider uppercase">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GourmetGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;