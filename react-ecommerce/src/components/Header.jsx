import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

function Header() {
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();

  // Quantidade total de itens no carrinho
  const totalItens = carrinho.reduce((acc, p) => acc + p.quantity, 0);

  // Redireciona para /produtos com o termo como query string
  function handleBusca(e) {
    e.preventDefault();
    if (termoBusca.trim() === '') return;
    setBuscaAberta(false);
    setTermoBusca('');
    navigate(`/produtos?busca=${encodeURIComponent(termoBusca.trim())}`);
  }

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <i className="fas fa-store text-2xl"></i>
              <span className="text-2xl font-bold">TechStore</span>
            </Link>

            {/* Navegação desktop — oculta no mobile */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link to="/" className="hover:text-blue-200 transition">Home</Link>
              <Link to="/produtos" className="hover:text-blue-200 transition">Produtos</Link>
              <Link to="/meus-pedidos" className="hover:text-blue-200 transition">Meus Pedidos</Link>
              
            </nav>

            {/* Ações do lado direito */}
            <div className="flex items-center space-x-4">

              {/* Botão de busca */}
              <button
                className="hover:text-blue-200 transition"
                onClick={() => setBuscaAberta(prev => !prev)}
              >
                <i className="fas fa-search"></i>
              </button>

              {/* Botão do carrinho com contador */}
              <Link to="/carrinho" className="hover:text-blue-200 transition relative">
                <i className="fas fa-shopping-cart text-xl"></i>
                {totalItens > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItens}
                  </span>
                )}
              </Link>

              {/* Botão hambúrguer — só no mobile */}
              <button
                className="md:hidden hover:text-blue-200 transition"
                onClick={() => setDrawerAberto(true)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>

          {/* Barra de busca — aparece ao clicar na lupa */}
          {buscaAberta && (
            <form onSubmit={handleBusca} className="mt-3 flex gap-2">
              <input
                type="text"
                autoFocus
                value={termoBusca}
                onChange={e => setTermoBusca(e.target.value)}
                placeholder="Buscar produtos..."
                className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => setBuscaAberta(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Fundo escuro do drawer */}
      {drawerAberto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerAberto(false)}
        />
      )}

      {/* Drawer lateral */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300
        ${drawerAberto ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Cabeçalho do drawer */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fas fa-store text-xl"></i>
            <span className="text-xl font-bold">TechStore</span>
          </div>
          <button onClick={() => setDrawerAberto(false)} className="hover:opacity-70 transition">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Links do drawer */}
        <nav className="flex flex-col px-6 py-6 space-y-1">
          <Link
            to="/"
            onClick={() => setDrawerAberto(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
          >
            <i className="fas fa-home w-5"></i>
            Home
          </Link>
          <Link
            to="/produtos"
            onClick={() => setDrawerAberto(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
          >
            <i className="fas fa-box w-5"></i>
            Produtos
          </Link>
          <Link
            to="/carrinho"
            onClick={() => setDrawerAberto(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
          >
            <i className="fas fa-shopping-cart w-5"></i>
            Carrinho
            {/* Badge de itens no carrinho */}
            {totalItens > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItens}
              </span>
            )}
          </Link>
          {/* Link Meus Pedidos no drawer */}
          <Link
            to="/meus-pedidos"
            onClick={() => setDrawerAberto(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
          >
            <i className="fas fa-box-open w-5"></i>
            Meus Pedidos
          </Link>
          <button
            onClick={() => setDrawerAberto(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium text-left"
          >
          </button>
        </nav>
      </div>
    </>
  );
}

export default Header;