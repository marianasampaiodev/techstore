import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <i className="fas fa-store text-2xl"></i>
            <span className="text-2xl font-bold">TechStore</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/produtos" className="hover:text-blue-200 transition">Produtos</Link>
            <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Sobre</button>

          </nav>
          <div className="flex items-center space-x-4">
            <button className="hover:text-blue-200 transition">
              <i className="fas fa-search"></i>
            </button>
            <button className="hover:text-blue-200 transition">
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
