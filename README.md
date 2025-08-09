# Sistema de Login - API e Aplicação Web

Este projeto inclui uma API REST para gestão de login e uma aplicação web moderna que consome essa API.

## 🚀 Funcionalidades

### API REST
- **Login**: Autenticação de usuários com validação de credenciais
- **Bloqueio por tentativas**: Usuário é bloqueado após 3 tentativas falhadas
- **Recuperação de senha**: Desbloqueia usuário e mostra senha atual
- **Documentação Swagger**: Interface interativa para testar a API

### Aplicação Web
- **Interface moderna**: Design responsivo com MaterializeCSS
- **Validação em tempo real**: Feedback visual para campos obrigatórios
- **Estados de loading**: Indicadores visuais durante requisições
- **Notificações toast**: Mensagens de sucesso, erro e aviso
- **Navegação fluida**: Alternância entre login e recuperação de senha

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Swagger**: Documentação da API

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos personalizados com gradientes e animações
- **JavaScript (ES6+)**: Lógica da aplicação
- **MaterializeCSS**: Framework CSS para design material
- **Material Icons**: Ícones do Google

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório** (se aplicável)
2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute a aplicação**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   - **Aplicação Web**: http://localhost:3000
   - **Documentação da API**: http://localhost:3000/api-docs

## 🧪 Testes

Execute os testes automatizados:

```bash
npm test
```

## 📋 Como Usar

### Via Aplicação Web

1. **Acesse** http://localhost:3000
2. **Faça login** com as credenciais:
   - Usuário: `maria`
   - Senha: `123456`
3. **Teste o bloqueio**: Digite senhas incorretas para ver o sistema de bloqueio
4. **Recupere a senha**: Use o link "Esqueci minha senha" para desbloquear

### Via API Direta

#### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"usuario": "maria", "senha": "123456"}'
```

#### Recuperar Senha
```bash
curl -X POST http://localhost:3000/recuperar-senha \
  -H "Content-Type: application/json" \
  -d '{"usuario": "maria"}'
```

## 📁 Estrutura do Projeto

```
login/
├── index.js              # Servidor Express e API
├── package.json          # Dependências e scripts
├── public/              # Arquivos da aplicação web
│   ├── index.html       # Página principal
│   ├── styles.css       # Estilos personalizados
│   └── script.js        # Lógica JavaScript
├── test/                # Testes automatizados
│   ├── login.test.js
│   └── recuperarSenha.test.js
└── README.md           # Documentação
```

## 🔧 Configuração

### Variáveis de Ambiente
- **Porta**: A aplicação roda na porta 3000 por padrão
- **API URL**: Configurada em `public/script.js` como `http://localhost:3000`

### Personalização
- **Cores**: Edite as variáveis CSS em `public/styles.css`
- **Comportamento**: Modifique a lógica em `public/script.js`
- **API**: Adicione novos endpoints em `index.js`

## 🎨 Características da Interface

- **Design responsivo**: Funciona em desktop, tablet e mobile
- **Animações suaves**: Transições e efeitos visuais
- **Feedback visual**: Estados de loading e validação
- **Acessibilidade**: Navegação por teclado e leitores de tela
- **Performance**: Carregamento otimizado de recursos

## 🔒 Segurança

- **Validação client-side**: Feedback imediato para o usuário
- **Validação server-side**: Segurança garantida no backend
- **Proteção contra bloqueio**: Sistema de recuperação de senha
- **Headers seguros**: Configuração adequada do Express

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto. 