import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';

function ProductList() {
  const [products, setProducts] = useState(productsData);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', ...new Set(productsData.map(p => p.category))];

  useEffect(() => {
    let filtered = filter === 'all' 
      ? productsData 
      : productsData.filter(p => p.category === filter);

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    setProducts(sorted);
  }, [filter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nossos Produtos</h1>

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

      {/* Grid de Produtos */}
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
    </div>
  );
}

export default ProductList;
