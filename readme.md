# API de Adoção de Pets

API RESTful para gerenciamento de adoção de animais de estimação, desenvolvida como projeto prático da disciplina de Desenvolvimento de Serviços Web do IFRS Campus Bento Gonçalves.

## Tecnologias utilizadas

- **Node.js**
- **MySQL12**
- **JWT**
- **bcryptjs**
- **dotenv**
- **ESLint** e **Prettier**
- **Nodemon**
- **REST Client**

## Instalação e execução

### Pré-requisitos

- Node.js instalado
- MySQL rodando localmente

### Passo a passo

1. Clone o repositório e acesse a pasta:

```bash
git clone https://github.com/cristiandoring/p2-dsw.git
cd p2-dsw
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o banco de dados executando o script SQL:

```bash
mysql -u root -p < src/database/pets_db.sql
```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=pets_db
PORT=3000
JWT_SECRET=seu_segredo_jwt
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Scripts disponíveis

```bash
npm run dev          # Inicia com nodemon
npm run lint         # Executa o ESLint
npm run lint:fix     # Corrige erros
npm run format       # Formata o código com Prettier
```

## Estrutura do banco de dados

### Tabela `users`

| Campo    | Tipo         | Descrição                       |
| -------- | ------------ | ------------------------------- |
| id       | INT (PK)     | Identificador único (auto inc.) |
| name     | VARCHAR(255) | Nome completo                   |
| email    | VARCHAR(255) | E-mail único                    |
| password | VARCHAR(255) | Senha criptografada com bcrypt  |
| phone    | VARCHAR(20)  | Telefone de contato             |
| role     | VARCHAR(20)  | Perfil: `admin` ou `adopter`    |

### Tabela `pets`

| Campo       | Tipo         | Descrição                           |
| ----------- | ------------ | ----------------------------------- |
| id          | INT (PK)     | Identificador único (auto inc.)     |
| name        | VARCHAR(255) | Nome do pet                         |
| age         | INT          | Idade aproximada em anos            |
| species     | VARCHAR(50)  | Espécie (ex: dog, cat)              |
| size        | VARCHAR(20)  | Porte: `small`, `medium` ou `large` |
| status      | VARCHAR(20)  | Situação: `available` ou `adopted`  |
| description | VARCHAR(255) | Informações adicionais (opcional)   |

### Tabela `adoptions`

| Campo         | Tipo     | Descrição                       |
| ------------- | -------- | ------------------------------- |
| id            | INT (PK) | Identificador único (auto inc.) |
| user_id       | INT (FK) | ID do usuário que adotou        |
| pet_id        | INT (FK) | ID do pet adotado               |
| adoption_date | DATE     | Data da adoção                  |

## Rotas da API

### Públicas (sem autenticação)

| Método | Rota            | Descrição                         |
| ------ | --------------- | --------------------------------- |
| POST   | /users          | Cadastra um novo usuário          |
| POST   | /login          | Realiza login e retorna token JWT |
| GET    | /pets/available | Lista todos os pets disponíveis   |

### Protegidas — Usuários (requer token JWT)

| Método | Rota       | Descrição                 | Acesso                   |
| ------ | ---------- | ------------------------- | ------------------------ |
| GET    | /users     | Lista todos os usuários   | admin                    |
| GET    | /users/:id | Busca usuário por ID      | admin ou próprio usuário |
| PUT    | /users/:id | Atualiza dados do usuário | admin ou próprio usuário |
| DELETE | /users/:id | Remove um usuário         | admin                    |

### Protegidas — Pets (requer token JWT)

| Método | Rota      | Descrição                                     | Acesso |
| ------ | --------- | --------------------------------------------- | ------ |
| GET    | /pets     | Lista todos os pets (inclusive adotados)      | admin  |
| GET    | /pets/:id | Busca pet por ID                              | admin  |
| POST   | /pets     | Cadastra um novo pet                          | admin  |
| PUT    | /pets/:id | Atualiza dados de um pet                      | admin  |
| DELETE | /pets/:id | Remove um pet (somente se status = available) | admin  |

### Protegidas — Adoções (requer token JWT)

| Método | Rota       | Descrição                  | Acesso  |
| ------ | ---------- | -------------------------- | ------- |
| GET    | /adoptions | Lista todas as adoções     | admin   |
| POST   | /adoptions | Realiza a adoção de um pet | adopter |

## Autenticação

A API utiliza JWT (Bearer Token). Após o login, inclua o token no header das requisições protegidas:

```
Authorization: Bearer <token>
```

O token expira em **1 hora** e contém `userId` e `role`.
