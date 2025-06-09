# QA Challenge – Playwright + TypeScript

Este projeto contém a automação de testes para UI e API, utilizando Playwright e TypeScript.

---

## ✅ Tecnologias utilizadas

- Node.js
- Playwright
- TypeScript

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/felipe-era/playwright_swaglabs_regres.git
cd playwright_swaglabs_regres
```

2. Instale as dependências:

```bash
npm install
```

3. Instale os navegadores necessários:

```bash
npx playwright install
```

---

## 🚀 Como rodar os testes

### 🔹 Testes de UI (Swag Labs)

```bash
npm run test:ui
```

### 🔹 Testes de API (Reqres)

```bash
npm run test:api
```

### 🔹 Todos os testes

```bash
npm test
```

---

## 📁 Estrutura do projeto

```
qa-challenge/
├── tests/
│   ├── ui/          → Testes de interface (Swag Labs)
│   └── api/         → Testes da API pública Reqres
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Scripts úteis

```json
"scripts": {
  "test": "npx playwright test",
  "test:ui": "npx playwright test tests/ui",
  "test:api": "npx playwright test tests/api"
}

```

---

## ⚙️ BDD


``` Funcionalidade: Testes da API Reqres.in

   Funcionalidade: Testes da API (regres.spec.ts)

  Cenário: CT001 - Consultar lista de usuários na página 2
    Dado que realizo uma requisição GET para /users?page=2
    Então a resposta deve conter o status 200
    E a resposta deve conter uma lista de usuários com e-mails válidos

  Cenário: CT002 - Criar novo usuário
    Quando envio uma requisição POST para /users com nome e cargo
    Então a resposta deve conter o status 201
    E o corpo da resposta deve conter o ID do novo usuário criado

  Cenário: CT003 - Atualizar usuário existente
    Dado que possuo o ID de um usuário criado
    Quando envio uma requisição PUT para /users/:id com novos dados
    Então a resposta deve conter o status 200
    E os dados atualizados devem refletir no corpo da resposta
    E o tempo de resposta deve ser inferior a 2000ms

  Cenário: CT004 - Simular falha de rede
    Quando envio uma requisição GET para uma URL inválida
    Então o sistema deve capturar e tratar o erro de rede

  Cenário: CT005 - Deletar usuário inexistente
    Quando envio uma requisição DELETE para /users/999
    Então a resposta deve conter o status 204

  Cenário: CT006 - Consultar usuário inexistente
    Quando envio uma requisição GET para /users/9999
    Então a resposta deve conter o status 404



Funcionalidade: Testes E2E (swaglabs.spec.ts)

  Cenário: CT001 - Login com credenciais válidas
    Dado que o usuário acessa a página de login
    Quando preenche o nome de usuário "standard_user" e a senha "secret_sauce"
    E clica no botão de login
    Então deve ser redirecionado para a página de inventário
    E o título da página deve ser "Products"

  Cenário: CT002 - Login com credenciais inválidas
    Dado que o usuário acessa a página de login
    Quando preenche o nome de usuário "usuario_invalido" e senha "senha_errada"
    E clica no botão de login
    Então uma mensagem de erro deve ser exibida
    E a mensagem deve conter "Username and password do not match"

  Cenário: CT003 - Adicionar e remover produtos do carrinho
    Dado que o usuário faz login com credenciais válidas
    Quando adiciona 3 produtos ao carrinho
    E remove 2 produtos
    E acessa o carrinho
    Então o carrinho deve conter apenas 1 item
    E o item restante deve ser "Sauce Labs Bolt T-Shirt"

  Cenário: CT003.1 - Adicionar e remover produtos dinamicamente
    Dado que o usuário faz login com credenciais válidas
    Quando adiciona os 3 primeiros produtos listados
    E remove os 2 primeiros produtos adicionados
    E acessa o carrinho
    Então o carrinho deve conter apenas 1 item
    E o nome do item restante deve ser exibido no log

  Cenário: CT004 - Simular erro no checkout sem preencher dados obrigatórios
    Dado que o usuário faz login com credenciais válidas
    E adiciona um produto ao carrinho
    E acessa o checkout
    Quando tenta continuar sem preencher os dados obrigatórios
    Então deve ser exibida a mensagem de erro "Error: First Name is required"

```

---
## ✍️ Autor

By **Felipe Eduardo** QA.
