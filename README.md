# API Node.js + Express + MongoDB: Cadastro de Usuário (CRUD) e Autenticação (JWT)

## Descrição

Este repositório contém uma API desenvolvida em Node.js utilizando o framework Express, integrada ao banco de dados MongoDB para fornecer funcionalidades robustas de cadastro de usuários e projetos com operações CRUD e autenticação segura utilizando JWT (JSON Web Token). A API é projetada para ser utilizada em aplicações web e móveis que necessitam de um sistema de gerenciamento de usuários eficiente e seguro.

## Recursos Principais

- **Cadastro de Usuário (CRUD):**
  - Criar, ler, atualizar e excluir informações de usuários.

- **Cadastro de Projeto (CRUD):**
  - Criar, ler, atualizar e excluir informações de projetos.

- **Autenticação (JWT):**
  - Login seguro com emissão de tokens JWT.
  - Proteção de rotas sensíveis por meio de middleware de autenticação JWT.
  - Renovação de token para manter sessões ativas.

## Tecnologias Utilizadas

- Node.js e Express para construção do servidor.
- MongoDB como banco de dados NoSQL.
- Mongoose como ODM para interação com o MongoDB.
- JWT para autenticação segura.

## Instruções de Uso

1. Faça um clone do repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env` com as variáveis necessárias (USER, PASSWORD, NAME).
4. Execute o servidor com `npm start`.
5. Execute os teste com `npm test`.