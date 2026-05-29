import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

const abas = [
  { status: 'pendente', label: 'Pendente', icone: 'fa-clock', cor: 'yellow' },
  { status: 'enviado', label: 'Enviado', icone: 'fa-truck', cor: 'blue' },
  { status: 'entregue', label: 'Entregue', icone: 'fa-check-circle', cor: 'green' }
];

const cores = {
  yellow: { badge: 'bg-yellow-100 text-yellow-700', icone: 'text-yellow-500', borda: 'border-yellow-400' },
  blue: { badge: 'bg-blue-100 text-blue-700', icone: 'text-blue-500', borda: 'border-blue-400' },
  green: { badge: 'bg-green-100 text-green-700', icone: 'text-green-500', borda: 'border-green-400' }
};

function MeusPedidos() {
  const { pedidos } = useCarrinho();
  const [abaAtiva, setAbaAtiva] = useState('pendente');

  const pedidosFiltrados = pedidos.filter(p => p.status === abaAtiva);
  const corAtiva = cores[abas.find(a => a.status === abaAtiva)?.cor];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

      {/* Abas de status — scroll horizontal no mobile */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {abas.map(aba => {
          const cor = cores[aba.cor];
          const quantidade = pedidos.filter(p => p.status === aba.status).length;
          const ativa = abaAtiva === aba.status;

          return (
            <button
              key={aba.status}
              onClick={() => setAbaAtiva(aba.status)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition border-2
                ${ativa ? `${cor.badge} ${cor.borda}` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
            >
              <i className={`fas ${aba.icone} ${ativa ? cor.icone : 'text-gray-400'}`}></i>
              {aba.label}
              {/* Contador de pedidos na aba */}
              <span className={`ml-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold
                ${ativa ? cor.badge : 'bg-gray-100 text-gray-500'}`}>
                {quantidade}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista de pedidos ou estado vazio */}
      {pedidosFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
          <i className={`fas ${abas.find(a => a.status === abaAtiva)?.icone} text-6xl text-gray-300 mb-4`}></i>
          <p className="text-gray-500 text-lg mb-6">Nenhum pedido {abaAtiva} ainda.</p>
          <Link
            to="/produtos"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidosFiltrados.map(pedido => (
            <div key={pedido.id} className={`bg-white rounded-lg shadow-sm border-l-4 ${corAtiva.borda} p-6`}>

              {/* Cabeçalho do card */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="font-bold text-gray-800">Pedido #{pedido.id}</p>
                  <p className="text-sm text-gray-500">Realizado em {pedido.data}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${corAtiva.badge}`}>
                  <i className={`fas ${abas.find(a => a.status === abaAtiva)?.icone} mr-1`}></i>
                  {abaAtiva.charAt(0).toUpperCase() + abaAtiva.slice(1)}
                </span>
              </div>

              {/* Itens do pedido */}
              <div className="space-y-3 mb-4">
                {pedido.itens.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-blue-600 flex-shrink-0">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rodapé — endereço, total e botão de detalhes */}
              <div className="border-t pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-gray-500">
                  <i className="fas fa-map-marker-alt mr-1 text-blue-500"></i>
                  {pedido.endereco.rua}, {pedido.endereco.numero} — {pedido.endereco.cidade}/{pedido.endereco.estado}
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="font-bold text-lg text-gray-800">
                    Total: <span className="text-blue-600">R$ {pedido.total.toFixed(2)}</span>
                  </div>
                  {/* Botão que leva para a página de detalhes e status do pedido */}
                  <Link
                    to={`/meus-pedidos/${pedido.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    <i className="fas fa-eye mr-1"></i>
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeusPedidos;