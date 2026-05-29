import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { useCarrinho } from '../context/CarrinhoContext'; // <- import do hook

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { adicionarProduto } = useCarrinho(); // <- pega a função do contexto

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Produto não encontrado</h2>
        <button 
          onClick={() => navigate('/produtos')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Voltar para Produtos
        </button>
      </div>
    );
  }

  // Filtra produtos da mesma categoria, excluindo o atual, limitando a 4
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Adiciona o produto com quantidade ao carrinho e redireciona
  function handleAdicionarCarrinho() {
    adicionarProduto({ ...product, quantity });
    navigate('/carrinho');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb — caminho de navegação */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/produtos" className="hover:text-blue-600">Produtos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagem do produto */}
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
          </div>
        </div>

        {/* Informações do produto */}
        <div>
          {/* Badge da categoria */}
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {/* Avaliação em estrelas — estrelas cheias até o rating, restante cinza */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
              ))}
            </div>
            <span className="ml-3 text-gray-600">({product.rating} de 5)</span>
          </div>

          {/* Preço e parcelamento */}
          <div className="mb-6">
            <span className="text-5xl font-bold text-blue-600">
              R$ {product.price.toFixed(2)}
            </span>
            <p className="text-gray-600 mt-2">ou 10x de R$ {(product.price / 10).toFixed(2)} sem juros</p>
          </div>

          {/* Disponibilidade em estoque */}
          <div className="mb-6">
            <p className="text-lg">
              <i className="fas fa-box mr-2 text-green-600"></i>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Produto esgotado'}
              </span>
            </p>
          </div>

          {/* Descrição do produto */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Descrição</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Lista de especificações técnicas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Especificações</h3>
            <ul className="space-y-2">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <i className="fas fa-check text-green-600 mr-3"></i>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Seletor de quantidade e botões de ação */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-semibold">Quantidade:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                {/* Diminui quantidade — mínimo 1 */}
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                {/* Aumenta quantidade — máximo igual ao estoque */}
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Botão adicionar ao carrinho — chama handleAdicionarCarrinho */}
            <button 
              onClick={handleAdicionarCarrinho}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition transform hover:scale-105 mb-3"
              disabled={product.stock === 0}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Adicionar ao Carrinho
            </button>

            {/* Botão comprar agora — sem ação definida ainda */}
            <button 
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
              disabled={product.stock === 0}
            >
              <i className="fas fa-bolt mr-2"></i>
              Comprar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Produtos relacionados — mesma categoria, excluindo o atual */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <Link to={`/produto/${relatedProduct.id}`}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h4>
                    <span className="text-lg font-bold text-blue-600">
                      R$ {relatedProduct.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;