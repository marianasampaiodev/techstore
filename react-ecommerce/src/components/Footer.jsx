import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechStore</h3>
            <p className="text-gray-400">Sua loja de tecnologia online com os melhores produtos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/produtos" className="hover:text-white transition">Produtos</Link></li>
              <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Sobre</button>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li><i className="fas fa-envelope mr-2"></i>contato@techstore.com</li>
              <li><i className="fas fa-phone mr-2"></i>(11) 9999-9999</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 TechStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
