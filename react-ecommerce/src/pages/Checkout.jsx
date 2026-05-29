import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

function Checkout() {
  const { carrinho, limparCarrinho, adicionarPedido } = useCarrinho();
  const navigate = useNavigate();

  // Etapa atual do stepper: 1 = Endereço, 2 = Pagamento, 3 = Confirmação
  const [etapa, setEtapa] = useState(1);

  // Estado do formulário de endereço
  const [endereco, setEndereco] = useState({
    nome: '', email: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: ''
  });

  // Estado do formulário de pagamento
  const [pagamento, setPagamento] = useState({
    metodo: 'cartao', numeroCartao: '', nomeCartao: '', validade: '', cvv: ''
  });

  // Calcula o total do carrinho
  const total = carrinho.reduce((acc, p) => acc + p.price * p.quantity, 0);

  // Avança para a próxima etapa
  function avancarEtapa() {
    setEtapa(prev => prev + 1);
  }

  // Volta para a etapa anterior
  function voltarEtapa() {
    setEtapa(prev => prev - 1);
  }

  // Salva o pedido, limpa o carrinho e avança para confirmação
  function finalizarPedido() {
    adicionarPedido({
      itens: carrinho,
      endereco,
      pagamento,
      total
    });
    limparCarrinho();
    setEtapa(3);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

      {/* Stepper — indica a etapa atual visualmente */}
      <div className="flex items-center justify-center mb-10">
        {['Endereço', 'Pagamento', 'Confirmação'].map((label, index) => {
          const numero = index + 1;
          const ativa = etapa === numero;
          const concluida = etapa > numero;

          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                {/* Círculo da etapa */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition
                  ${concluida ? 'bg-green-500 text-white' : ativa ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {concluida ? <i className="fas fa-check"></i> : numero}
                </div>
                {/* Label da etapa */}
                <span className={`text-xs mt-1 font-medium ${ativa ? 'text-blue-600' : concluida ? 'text-green-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>

              {/* Linha conectora entre etapas */}
              {index < 2 && (
                <div className={`h-1 w-16 md:w-24 mx-2 mb-4 rounded transition ${etapa > numero ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Conteúdo principal da etapa */}
        <div className="lg:col-span-2">

          {/* ── ETAPA 1: ENDEREÇO ── */}
          {etapa === 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">
                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nome completo */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                  <input
                    type="text"
                    value={endereco.nome}
                    onChange={e => setEndereco({ ...endereco, nome: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={endereco.email}
                    onChange={e => setEndereco({ ...endereco, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* CEP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    value={endereco.cep}
                    onChange={e => setEndereco({ ...endereco, cep: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="00000-000"
                  />
                </div>

                {/* Número */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="text"
                    value={endereco.numero}
                    onChange={e => setEndereco({ ...endereco, numero: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>

                {/* Rua */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <input
                    type="text"
                    value={endereco.rua}
                    onChange={e => setEndereco({ ...endereco, rua: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome da rua"
                  />
                </div>

                {/* Bairro */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={endereco.bairro}
                    onChange={e => setEndereco({ ...endereco, bairro: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu bairro"
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={endereco.cidade}
                    onChange={e => setEndereco({ ...endereco, cidade: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Sua cidade"
                  />
                </div>

                {/* Estado */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={endereco.estado}
                    onChange={e => setEndereco({ ...endereco, estado: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o estado</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botão avançar */}
              <button
                onClick={avancarEtapa}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continuar para Pagamento
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          )}

          {/* ── ETAPA 2: PAGAMENTO ── */}
          {etapa === 2 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">
                <i className="fas fa-credit-card mr-2 text-blue-600"></i>
                Pagamento
              </h2>

              {/* Seleção do método de pagamento — sem boleto */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { valor: 'cartao', label: 'Cartão', icone: 'fa-credit-card' },
                  { valor: 'pix', label: 'Pix', icone: 'fa-qrcode' },
                ].map(({ valor, label, icone }) => (
                  <button
                    key={valor}
                    onClick={() => setPagamento({ ...pagamento, metodo: valor })}
                    className={`border-2 rounded-lg py-3 flex flex-col items-center gap-1 transition
                      ${pagamento.metodo === valor ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                  >
                    <i className={`fas ${icone} text-xl`}></i>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {/* Campos do cartão */}
              {pagamento.metodo === 'cartao' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      value={pagamento.numeroCartao}
                      onChange={e => setPagamento({ ...pagamento, numeroCartao: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartão</label>
                    <input
                      type="text"
                      value={pagamento.nomeCartao}
                      onChange={e => setPagamento({ ...pagamento, nomeCartao: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome igual ao cartão"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                    <input
                      type="text"
                      value={pagamento.validade}
                      onChange={e => setPagamento({ ...pagamento, validade: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={pagamento.cvv}
                      onChange={e => setPagamento({ ...pagamento, cvv: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="000"
                    />
                  </div>
                </div>
              )}

              {/* QR Code do Pix */}
              {pagamento.metodo === 'pix' && (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  {/* QR Code gerado via API pública — encode do valor total */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=pix@techstore.com|valor:${total.toFixed(2)}`}
                    alt="QR Code Pix"
                    className="mx-auto mb-3 rounded-lg"
                  />
                  <p className="text-gray-700 font-semibold">Escaneie o QR Code para pagar</p>
                  <p className="text-blue-600 font-bold text-lg mt-1">R$ {total.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mt-1">Chave Pix: contato@techstore.com</p>
                </div>
              )}

              {/* Botões de voltar e confirmar */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={voltarEtapa}
                  className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Voltar
                </button>
                <button
                  onClick={finalizarPedido}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <i className="fas fa-check mr-2"></i>
                  Confirmar Pedido
                </button>
              </div>
            </div>
          )}

          {/* ── ETAPA 3: CONFIRMAÇÃO ── */}
          {etapa === 3 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
              {/* Ícone de sucesso */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h2>
              <p className="text-gray-500 mb-6">Obrigado pela sua compra. Você receberá um e-mail com os detalhes.</p>

              {/* Resumo do endereço e pagamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-700">
                    <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                    Endereço de Entrega
                  </h4>
                  <p className="text-sm text-gray-600">{endereco.nome}</p>
                  <p className="text-sm text-gray-600">{endereco.rua}, {endereco.numero}</p>
                  <p className="text-sm text-gray-600">{endereco.bairro} — {endereco.cidade}/{endereco.estado}</p>
                  <p className="text-sm text-gray-600">CEP: {endereco.cep}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-700">
                    <i className="fas fa-credit-card mr-2 text-blue-600"></i>
                    Pagamento
                  </h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {pagamento.metodo === 'cartao' ? `Cartão final ${pagamento.numeroCartao.slice(-4)}` : 'Pix'}
                  </p>
                  <p className="text-sm font-bold text-blue-600 mt-1">Total: R$ {total.toFixed(2)}</p>
                </div>
              </div>

              {/* Botões pós-compra */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/meus-pedidos')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-box mr-2"></i>
                  Acompanhar Pedido
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Voltar para a Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumo do pedido — lateral direita */}
        {etapa !== 3 && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
              <div className="space-y-3 mb-4">
                {carrinho.map(produto => (
                  <div key={produto.id} className="flex items-center gap-3">
                    <img src={produto.image} alt={produto.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-grow text-sm min-w-0">
                      <p className="font-medium text-gray-700 truncate">{produto.name}</p>
                      <p className="text-gray-500">x{produto.quantity}</p>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0">R$ {(produto.price * produto.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;