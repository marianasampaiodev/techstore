# 🛒 E-commerce React - TechStore

Projeto completo de e-commerce desenvolvido em **React** com as melhores práticas e organização de código.

## 📁 Estrutura do Projeto

```
react-ecommerce/
├── public/
│   └── index.html           # HTML principal
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho da aplicação
│   │   └── Footer.jsx       # Rodapé da aplicação
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.jsx         # Página inicial
│   │   ├── ProductList.jsx  # Listagem de produtos
│   │   └── ProductDetail.jsx # Detalhes do produto
│   ├── data/
│   │   └── products.js      # Dados dos produtos (mock)
│   ├── App.jsx              # Componente principal
│   ├── index.js             # Ponto de entrada
│   └── index.css            # Estilos globais + Tailwind
├── package.json             # Dependências do projeto
├── tailwind.config.js       # Configuração do Tailwind
├── .gitignore
└── README.md
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Instalar Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Executar o Projeto

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

### 4. Build para Produção

```bash
npm run build
```

## 📦 Dependências Principais

- **React** ^18.2.0 - Biblioteca JavaScript
- **React Router DOM** ^6.20.0 - Roteamento
- **Tailwind CSS** - Framework CSS utility-first
- **Font Awesome** - Biblioteca de ícones

## ✨ Funcionalidades

### 🏠 Página Home (`/`)
- Hero section com call-to-action
- Cards de recursos (Entrega, Segurança, Suporte)
- Produtos em destaque
- Design responsivo e moderno

### 📋 Página de Produtos (`/produtos`)
- Grid responsivo de produtos
- Filtro por categoria
- Ordenação por:
  - Nome (A-Z)
  - Preço (Crescente/Decrescente)
  - Avaliação
- Cards interativos com informações completas
- Sistema de estoque

### 🔍 Página de Detalhes (`/produto/:id`)
- Imagem em destaque
- Informações completas do produto
- Avaliação com estrelas
- Especificações técnicas
- Seletor de quantidade
- Botões de ação (Carrinho/Comprar)
- Breadcrumb de navegação
- Produtos relacionados
- Verificação de estoque

## 🎨 Componentes

### Header
- Logo clicável
- Menu de navegação
- Ícones de busca e carrinho
- Responsivo (mobile menu)

### Footer
- Informações da empresa
- Links úteis
- Contato
- Copyright

### ProductCard (integrado nas páginas)
- Imagem do produto
- Nome e categoria
- Preço formatado
- Avaliação
- Botão de ação

## 📊 Dados dos Produtos

O arquivo `src/data/products.js` contém um array com 8 produtos de exemplo:

```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,
  image: string,
  description: string,
  specs: string[],
  stock: number,
  rating: number
}
```

**Categorias disponíveis:**
- Eletrônicos
- Áudio
- Wearables
- Fotografia
- Periféricos

## 🎯 Recursos Técnicos

### React Hooks Utilizados
- `useState` - Gerenciamento de estado
- `useEffect` - Efeitos colaterais (filtros)
- `useParams` - Parâmetros de rota
- `useNavigate` - Navegação programática

### React Router
- `BrowserRouter` - Roteamento no navegador
- `Routes` / `Route` - Definição de rotas
- `Link` - Navegação sem recarregar página
- Rotas dinâmicas com parâmetros

### Tailwind CSS
- Classes utility-first
- Design responsivo (mobile-first)
- Customização de cores e temas
- Hover states e transitions
- Grid e Flexbox

## 📱 Responsividade

### Breakpoints Tailwind
- `sm:` 640px - Small devices
- `md:` 768px - Tablets
- `lg:` 1024px - Laptops
- `xl:` 1280px - Desktops

### Layout Adaptativo
- Mobile: 1 coluna
- Tablet: 2-3 colunas
- Desktop: 3-4 colunas

## 🔧 Configuração Adicional

### ESLint (opcional)
```bash
npm install -D eslint eslint-plugin-react
```

### Prettier (opcional)
```bash
npm install -D prettier
```

## 🌐 Rotas da Aplicação

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Home` | Página inicial |
| `/produtos` | `ProductList` | Listagem de produtos |
| `/produto/:id` | `ProductDetail` | Detalhes do produto |

## 💡 Melhorias Futuras

- [ ] Implementar Context API para carrinho
- [ ] Adicionar sistema de autenticação
- [ ] Integrar com backend/API
- [ ] Adicionar testes (Jest/Testing Library)
- [ ] Implementar lazy loading de imagens
- [ ] Sistema de busca funcional
- [ ] Filtros avançados (preço, marca)
- [ ] Checkout completo
- [ ] Área do usuário
- [ ] Sistema de wishlist

## 📝 Boas Práticas Implementadas

✅ Componentização adequada  
✅ Separação de responsabilidades  
✅ Código limpo e legível  
✅ Nomenclatura semântica  
✅ Estrutura de pastas organizada  
✅ Reutilização de componentes  
✅ Responsividade  
✅ Acessibilidade básica  

## 🐛 Troubleshooting

### Erro de módulo não encontrado
```bash
npm install
npm start
```

### Tailwind não está funcionando
Verifique se o `tailwind.config.js` está configurado corretamente e se o `index.css` importa as diretivas do Tailwind.

### Rotas não funcionam no build
Configure o servidor para redirecionar todas as rotas para `index.html` (SPA behavior).

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique a documentação oficial do React
- Consulte a documentação do Tailwind CSS
- Revise os componentes e suas props

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com React ⚛️ + Tailwind CSS 🎨**
