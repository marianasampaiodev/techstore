import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

// Etapas da timeline com label, ícone e descrição
const etapas = [
  { status: 'pendente', label: 'Pedido Realizado', icone: 'fa-clock', descricao: 'Seu pedido foi recebido e está aguardando pagamento.' },
  { status: 'enviado', label: 'Pedido Enviado', icone: 'fa-truck', descricao: 'Seu pedido saiu para entrega.' },
  { status: 'entregue', label: 'Pedido Entregue', icone: 'fa-check-circle', descricao: 'Seu pedido foi entregue com sucesso!' },
];

// Índice de cada status para comparação na timeline
const ordemStatus = { pendente: 0, enviado: 1, entregue: 2 };

function PedidoDetalhe() {
  const { id } = useParams(); // pega o id do pedido pela URL
  const navigate = useNavigate();
  const { pedidos, atualizarStatusPedido } = useCarrinho();

  // Busca o pedido pelo id da URL
  const pedido = pedidos.find(p => p.id === parseInt(id));

  // Se o pedido não for encontrado exibe mensagem de erro
  if (!pedido) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold mb-4">Pedido não encontrado</h2>
        <button
          onClick={() => navigate('/meus-pedidos')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Ver Meus Pedidos
        </button>
      </div>
    );
  }

  const indiceAtual = ordemStatus[pedido.status];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">

      {/* Botão voltar */}
      <button
        onClick={() => navigate('/meus-pedidos')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-6 font-medium"
      >
        <i className="fas fa-arrow-left"></i>
        Voltar para Meus Pedidos
      </button>

      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pedido #{pedido.id}</h1>
          <p className="text-gray-500 text-sm mt-1">Realizado em {pedido.data}</p>
        </div>
        {/* Botão avançar status — não aparece se já foi entregue */}
        {pedido.status !== 'entregue' && (
          <button
            onClick={() => atualizarStatusPedido(pedido.id)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Avançar Status
          </button>
        )}
      </div>

      {/* Timeline de status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-6">Acompanhamento do Pedido</h2>
        <div className="relative">
          {etapas.map((etapa, index) => {
            const concluida = indiceAtual > index;
            const ativa = indiceAtual === index;

            return (
              <div key={etapa.status} className="flex gap-4 mb-6 last:mb-0 relative">

                {/* Linha vertical conectora entre etapas */}
                {index < etapas.length - 1 && (
                  <div className={`absolute left-5 top-10 w-0.5 h-full -mb-6 transition-colors
                    ${concluida ? 'bg-green-500' : 'bg-gray-200'}`}
                  />
                )}

                {/* Círculo da etapa */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors
                  ${concluida ? 'bg-green-500 text-white' : ativa ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <i className={`fas ${etapa.icone} text-sm`}></i>
                </div>

                {/* Texto da etapa */}
                <div className="pt-1">
                  <p className={`font-semibold ${ativa ? 'text-blue-600' : concluida ? 'text-green-600' : 'text-gray-400'}`}>
                    {etapa.label}
                  </p>
                  <p className={`text-sm mt-0.5 ${ativa || concluida ? 'text-gray-600' : 'text-gray-400'}`}>
                    {etapa.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Itens do pedido */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
        <div className="space-y-4">
          {pedido.itens.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
              </div>
              <span className="font-bold text-blue-600 flex-shrink-0">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-blue-600">R$ {pedido.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Endereço e pagamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-3">
            <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
            Endereço de Entrega
          </h2>
          <p className="text-sm text-gray-600">{pedido.endereco.nome}</p>
          <p className="text-sm text-gray-600">{pedido.endereco.rua}, {pedido.endereco.numero}</p>
          <p className="text-sm text-gray-600">{pedido.endereco.bairro} — {pedido.endereco.cidade}/{pedido.endereco.estado}</p>
          <p className="text-sm text-gray-600">CEP: {pedido.endereco.cep}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-3">
            <i className="fas fa-credit-card mr-2 text-blue-600"></i>
            Pagamento
          </h2>
          <p className="text-sm text-gray-600 capitalize">
            {pedido.pagamento.metodo === 'cartao'
              ? `Cartão final ${pedido.pagamento.numeroCartao.slice(-4)}`
              : 'Pix'}
          </p>
          <p className="text-sm font-bold text-blue-600 mt-1">Total: R$ {pedido.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default PedidoDetalhe;