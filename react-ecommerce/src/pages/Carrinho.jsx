import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';


function Carrinho() {
  // Lê a lista de produtos e a função de remover do contexto global
  const { carrinho, removerProduto } = useCarrinho();
  const navigate = useNavigate();

  // Calcula o total somando preço * quantidade de cada produto
  const total = carrinho.reduce((acc, produto) => acc + produto.price * produto.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {/* Se o carrinho estiver vazio, exibe mensagem com botão de voltar */}
      {carrinho.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg mb-6">Seu carrinho está vazio.</p>
          <button
            onClick={() => navigate('/produtos')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ver Produtos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lista de produtos no carrinho */}
          <div className="lg:col-span-2 space-y-4">
            {carrinho.map(produto => (
              // Card de cada produto com imagem, nome, preço e botão de remover
              <div key={produto.id} className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100">

                {/* Imagem do produto */}
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                {/* Informações do produto */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{produto.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{produto.category}</p>
                  <p className="text-blue-600 font-bold">R$ {produto.price.toFixed(2)}</p>
                  {/* Exibe a quantidade selecionada na página de detalhe */}
                  <p className="text-sm text-gray-500">Quantidade: {produto.quantity}</p>
                </div>

                {/* Subtotal e botão de remover */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800 mb-2">
                    R$ {(produto.price * produto.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="text-red-500 hover:text-red-700 text-sm transition"
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bloco de resumo e finalizar compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              {/* Lista resumida com nome e subtotal de cada item */}
              <div className="space-y-2 mb-4">
                {carrinho.map(produto => (
                  <div key={produto.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate mr-2">{produto.name} x{produto.quantity}</span>
                    <span className="flex-shrink-0">R$ {(produto.price * produto.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Linha divisória */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Botão de finalizar compra */}
              <button
                onClick={() => navigate('/checkout')}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition mb-3"
>
                <i className="fas fa-bolt mr-2"></i>
                     Finalizar Compra
                </button>

              {/* Botão de continuar comprando */}
              <button
                onClick={() => navigate('/produtos')}
                className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Continuar Comprando
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Carrinho;