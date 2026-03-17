# 🚀 Guia de Instalação Rápida

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Passo a Passo

### 1. Navegue até a pasta do projeto
```bash
cd react-ecommerce
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Instale o Tailwind CSS e dependências
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 4. Inicie o servidor de desenvolvimento
```bash
npm start
```

### 5. Acesse no navegador
```
http://localhost:3000
```

## ✅ Pronto!

O projeto estará rodando e você poderá navegar entre as páginas:
- Home: http://localhost:3000/
- Produtos: http://localhost:3000/produtos
- Detalhes: http://localhost:3000/produto/1

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm start          # Inicia servidor dev
```

### Build
```bash
npm run build      # Cria build de produção
```

### Testes
```bash
npm test           # Executa testes
```

## 📦 O que foi instalado

- react & react-dom (18.2.0)
- react-router-dom (6.20.0)
- react-scripts (5.0.1)
- tailwindcss
- postcss
- autoprefixer

## 💡 Dicas

1. **Hot Reload**: O projeto usa hot reload, então qualquer alteração será refletida automaticamente
2. **Porta ocupada**: Se a porta 3000 estiver em uso, o React perguntará se quer usar outra
3. **Erros**: Verifique o console do navegador e do terminal para mensagens de erro

## 🐛 Problemas Comuns

### "npm not found"
Instale o Node.js: https://nodejs.org/

### Porta 3000 em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Boa sorte com o projeto! 🎉**
