# 📚 Projeto Escolas — Guia de Clean Architecture

Este documento serve como **guia de referência para o desenvolvimento do projeto**, seguindo os princípios da **Clean Architecture**.
O objetivo é manter o código **organizado, desacoplado, testável e escalável**.

---

# 🏗 Estrutura de Pastas

```
src
 ├── domain
 │    ├── entities
 │    └── repositories
 │
 ├── application
 │    ├── dtos
 │    └── use-cases
 │
 ├── infra
 │    ├── database
 │    └── http
 │         ├── controllers
 │         ├── middlewares
 │         └── routes
 │
 └── main
      └── index.ts
```

---

# 🧠 Regra de Dependência (REGRA DE OURO)

As dependências sempre apontam **de fora para dentro**.

```
        ┌──────────────┐
        │     main     │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │     infra    │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │  application │
        └──────┬───────┘
               │
        ┌──────▼───────┐
        │    domain    │
        └──────────────┘
```

## Regra

| Camada      | Pode conhecer        |
| ----------- | -------------------- |
| domain      | ninguém              |
| application | domain               |
| infra       | application + domain |
| main        | todas                |

---

# 📦 Responsabilidade de Cada Camada

---

# Domain (Regra de negócio pura)

O **Domain é o coração da aplicação**.
Aqui ficam **as regras de negócio e contratos**.

```
domain/
   entities/
   repositories/
```

---

## Entities

Representam os **objetos do negócio**.

Exemplo:

```ts
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
  ) {}
}
```

---

## Repositories (Interfaces)

Define **contratos de acesso a dados**, sem implementação.

```ts
export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
```

⚠️ **Nunca acessar banco de dados aqui**

---

# ⚙️ Application (Casos de Uso)

Aqui ficam **as ações da aplicação**.

```
application/
   dtos/
   use-cases/
```

---

## DTOs

DTO = **Data Transfer Object**

Servem para transportar dados entre camadas.

```ts
export interface CreateUserDTO {
  name: string;
  email: string;
}
```

---

## Use Cases

Cada funcionalidade do sistema vira um **Use Case**.

Exemplo:

```
CreateUserUseCase
```

```ts
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const user = new User(crypto.randomUUID(), data.name, data.email);

    await this.userRepository.create(user);

    return user;
  }
}
```

⚠️ O Use Case **não sabe qual banco está sendo usado**.

---

# 🌐 Infra (Detalhes Técnicos)

Aqui ficam **implementações concretas**.

```
infra/
   database/
   http/
```

---

# Database

Aqui implementamos os repositories.

```
infra/database/repositories
```

Exemplo:

```ts
export class UserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    // salvar no banco
  }

  async findByEmail(email: string) {
    // query no banco
  }
}
```

---

# HTTP

Estrutura:

```
infra/http/
   controllers
   middlewares
   routes
```

---

## Controller

Controller **não contém regra de negócio**.

Responsabilidades:

- Receber request
- Chamar use case
- Retornar response

Exemplo:

```ts
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req, res) {
    const { name, email } = req.body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
    });

    return res.json(user);
  }
}
```

---

# Routes

Define endpoints da API.

```ts
router.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});
```

---

# 🚀 Main (Composition Root)

A camada **main é responsável por montar a aplicação**.

Aqui todas as dependências são instanciadas.

```
main/
   index.ts
```

Exemplo:

```ts
const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

const createUserController = new CreateUserController(createUserUseCase);
```

Isso se chama:

### Dependency Injection

---

# 🔄 Fluxo de execução da aplicação

```
Request HTTP
      ↓
Routes
      ↓
Controller
      ↓
UseCase
      ↓
Repository Interface
      ↓
Repository Implementation
      ↓
Database
```

---

# 📌 Regras para não quebrar a arquitetura

---

## ❌ Domain não importa ninguém

Nunca fazer:

```ts
import express
import prisma
import mysql
```

---

## ❌ UseCase não acessa banco diretamente

Nunca fazer:

```ts
import prisma
```

Sempre usar:

```
Repository Interface
```

---

## ❌ Controller não tem regra de negócio

Controller deve apenas:

```
receber request
chamar use case
retornar response
```

---

# 📍 Checklist para criar novas funcionalidades

Sempre seguir esta ordem:

---

### 1️⃣ Criar entidade (se necessário)

```
domain/entities
```

---

### 2️⃣ Criar interface de repository

```
domain/repositories
```

---

### 3️⃣ Criar DTO

```
application/dtos
```

---

### 4️⃣ Criar Use Case

```
application/use-cases
```

---

### 5️⃣ Implementar repository

```
infra/database
```

---

### 6️⃣ Criar Controller

```
infra/http/controllers
```

---

### 7️⃣ Criar Route

```
infra/http/routes
```

---

### 8️⃣ Instanciar no main

```
main/index.ts
```

---

# 🧠 Regra simples para lembrar sempre

```
Domain = regra de negócio

Application = ações do sistema

Infra = tecnologias externas

Main = montagem da aplicação
```

---

# 🎯 Benefícios dessa arquitetura

Seguindo esse padrão o projeto terá:

- baixo acoplamento
- alta testabilidade
- fácil manutenção
- fácil troca de banco de dados
- fácil troca de framework

Exemplo:

Você poderia trocar **Express → Fastify** sem alterar **Use Cases** ou **Domain**.

---

# 📌 Objetivo deste documento

Este README serve como **guia arquitetural do projeto**, garantindo que o código permaneça **organizado e alinhado com os princípios da Clean Architecture**.
