import React from 'react';
import { Link } from 'react-router-dom';

//Componente de rodapé do site, com informações de contato e links rápidos
function Footer() {
  return (
    // Rodapé com fundo cinza escuro e texto branco, com margin superior para separar do conteúdo principal
    <footer className="bg-gray-800 text-white mt-16">

      {/*Container Centralizado com padding interno */}
      <div className="container mx-auto px-4 py-8">

          {/*Grid responsivo: 1 coluna no mobile, 3 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/*Coluna 1: Identidade da marca*/}
          <div>
            <h3 className="text-xl font-bold mb-4">Tech Store</h3>
            <p className="text-gray-400">Sua loja de tecnologia online com os melhores produtos.</p>
          </div>
          {/* Coluna 2: Links Rápidos Externas*/}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              {/*Link para Home, Produtos e Sobre */}
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/produtos" className="hover:text-white transition">Produtos</Link></li>
              <li><Link to="/meus-pedidos" className="hover:text-white transition">Meus Pedidos</Link></li>
            </ul>
          </div>
          {/*Coluna 3: Informações de Contato com ícones front */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">

              {/*Email e telefone para contato */}
              <li><i className="fas fa-envelope mr-2"></i>contato@techstore.com</li>
              <li><i className="fas fa-phone mr-2"></i>(11) 9999-9999</li>
            </ul>
          </div>
        </div>
        {/*Linha divisória e copyright - sepaado do conteudo principal */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 TechStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
