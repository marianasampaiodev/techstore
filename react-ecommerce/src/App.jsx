import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Carrinho from './pages/Carrinho';
import { CarrinhoProvider } from './context/CarrinhoContext';
import Checkout from './pages/Checkout';
import MeusPedidos from './pages/MeusPedidos';
import PedidoDetalhe from './pages/PedidoDetalhe';





function App() {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<ProductList />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/carrinho" element={<Carrinho />} />  {/* <- adiciona essa linha */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Meus-pedidos" element={<MeusPedidos />} />
            <Route path="/meus-pedidos/:id" element={<PedidoDetalhe />} />


          </Routes>
          
        </main>
        <Footer />
      </div>
      </CarrinhoProvider>
    </BrowserRouter>
  );
}

export default App;
