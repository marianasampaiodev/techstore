import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // <- adiciona useSearchParams
import { productsData } from '../data/products';

function ProductList() {
  const [products, setProducts] = useState(productsData);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchParams] = useSearchParams(); // lê os parâmetros da URL

  const categories = ['all', ...new Set(productsData.map(p => p.category))];

  useEffect(() => {
    // Pega o termo de busca da URL (ex: /produtos?busca=notebook)
    const termoBusca = searchParams.get('busca') || '';

    let filtered = filter === 'all'
      ? productsData
      : productsData.filter(p => p.category === filter);

    // Se houver termo de busca, filtra por nome ou categoria
    if (termoBusca) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.category.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    setProducts(sorted);
  }, [filter, sortBy, searchParams]); // <- adiciona searchParams nas dependências

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nossos Produtos</h1>

      {/* Exibe o termo buscado se houver */}
      {searchParams.get('busca') && (
        <div className="mb-6 flex items-center gap-2">
          <p className="text-gray-600">
            Resultados para: <span className="font-semibold text-blue-600">"{searchParams.get('busca')}"</span>
          </p>
          {/* Botão para limpar a busca */}
          <Link to="/produtos" className="text-sm text-red-500 hover:text-red-700 transition">
            <i className="fas fa-times mr-1"></i>
            Limpar busca
          </Link>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Categoria:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas as Categorias' : cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Nome (A-Z)</option>
              <option value="price-asc">Preço (Menor)</option>
              <option value="price-desc">Preço (Maior)</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de produtos — exibe mensagem se nenhum resultado for encontrado */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">Nenhum produto encontrado para "{searchParams.get('busca')}".</p>
          <Link to="/produtos" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Ver todos os produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              <Link to={`/produto/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-4">
                <span className="text-xs text-blue-600 font-semibold">{product.category}</span>
                <h3 className="text-lg font-semibold mt-1 mb-2 line-clamp-2">
                  <Link to={`/produto/${product.id}`} className="hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-600 text-xs">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                  </span>
                </div>
                <Link
                  to={`/produto/${product.id}`}
                  className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;