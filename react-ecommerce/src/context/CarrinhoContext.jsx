import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  function adicionarProduto(produto) {
    setCarrinho(prev => [...prev, produto]);
  }

  function removerProduto(id) {
    setCarrinho(prev => prev.filter(p => p.id !== id));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function adicionarPedido(pedido) {
    setPedidos(prev => [
      ...prev,
      {
        ...pedido,
        id: Date.now(),
        status: 'pendente',
        data: new Date().toLocaleDateString('pt-BR')
      }
    ]);
  }

  // Avança o status do pedido: pendente → enviado → entregue
  function atualizarStatusPedido(id) {
    setPedidos(prev => prev.map(p => {
      if (p.id !== id) return p;
      const proximo = { pendente: 'enviado', enviado: 'entregue' };
      return { ...p, status: proximo[p.status] || p.status };
    }));
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, pedidos, adicionarProduto, removerProduto, limparCarrinho, adicionarPedido, atualizarStatusPedido }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}