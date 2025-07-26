# API de Login

Esta é uma API REST para gestão de login, criada para fins de estudo de testes de software. Não utiliza banco de dados, todas as informações são armazenadas em memória.

## Funcionalidades
- **Login realizado com sucesso**
- **Login inválido**
- **Bloqueio de senha após 3 tentativas**
- **Recuperação de senha**

## Tecnologias
- Node.js
- Express
- Swagger (swagger-ui-express, swagger-jsdoc)

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   node index.js
   ```

A API estará disponível em: http://localhost:3000

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

### POST /login
```json
{
  "usuario": "maria",
  "senha": "123456"
}
```
- 200: Login realizado com sucesso
- 401: Login inválido
- 423: Usuário bloqueado

### POST /recuperar-senha
```json
{
  "usuario": "maria"
}
```
- 200: Senha recuperada
- 404: Usuário não encontrado

## Observações
- Usuário padrão para teste: `maria` / senha: `123456`
- Após 3 tentativas de senha errada, o usuário é bloqueado.
- A recuperação de senha "desbloqueia" o usuário e retorna a senha cadastrada (apenas para fins de estudo). 
