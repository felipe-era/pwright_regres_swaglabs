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
BDD/Gherkin Testes E2E
Com certeza! Aqui estão os BDDs/Gherkin atualizados para português (Dado, Quando, Então):

Feature: Testes de Interface de Usuário (UI)
Cenário: CT001 - Login com credenciais válidas
Dado: Que o usuário está na página de login da Sauce Demo
Quando: Ele insere as credenciais válidas "standard_user" no campo de usuário
E: Ele insere "secret_sauce" no campo de senha
E: Ele clica no botão "Login"
Então: O usuário deve ser redirecionado para a página de inventário
E: O título da página deve ser "Products"

Cenário: CT002 - Login com credenciais inválidas
Dado: Que o usuário está na página de login da Sauce Demo
Quando: Ele insere credenciais inválidas "usuario_invalido" no campo de usuário
E: Ele insere "senha_errada" no campo de senha
E: Ele clica no botão "Login"
Então: Uma mensagem de erro deve ser exibida
E: A mensagem de erro deve conter o texto "Username and password do not match"

Cenário: CT003 - Adicionar e remover produtos do carrinho
Dado: Que o usuário está logado no site da Sauce Demo
Quando: Ele adiciona "Sauce Labs Backpack" ao carrinho
E: Ele adiciona "Sauce Labs Bike Light" ao carrinho
E: Ele adiciona "Sauce Labs Bolt T-Shirt" ao carrinho
E: Ele remove "Sauce Labs Backpack" do carrinho
E: Ele remove "Sauce Labs Bike Light" do carrinho
E: Ele navega para a página do carrinho
Então: O carrinho deve conter apenas 1 item
E: O item restante no carrinho deve ser "Sauce Labs Bolt T-Shirt"

Cenário: CT003.1 - Adicionar e remover produtos dinamicamente
Dado: Que o usuário está logado no site da Sauce Demo
Quando: Ele adiciona os 3 primeiros produtos exibidos ao carrinho
E: Ele remove os 2 primeiros produtos adicionados do carrinho
E: Ele navega para a página do carrinho
Então: O carrinho deve conter apenas 1 item

Cenário: CT004 - Simular erro no checkout sem preencher dados obrigatórios
Dado: Que o usuário está logado no site da Sauce Demo
E: Ele adicionou um produto ao carrinho
E: Ele navegou para a página do carrinho
E: Ele clicou no botão "Checkout"
Quando: Ele tenta continuar o processo de checkout sem preencher os dados obrigatórios
Então: Uma mensagem de erro deve ser exibida
E: A mensagem de erro deve ser "Error: First Name is required"

BDD/Gherkin Testes API
Cenário CT001 - GET /users?page=2 retorna usuários válidos
Dado que eu tenho acesso à API Reqres
Quando eu faço uma requisição GET para '/users?page=2'
Então a resposta deve ter o status 200
E o corpo da resposta deve ser um array de usuários
E cada usuário deve ter um 'id'
E cada usuário deve ter um 'email'
E o 'email' de cada usuário deve estar em um formato válido

Cenário CT002 - POST /users cria um novo usuário e salva o ID
Dado que eu tenho acesso à API Reqres
Quando eu faço uma requisição POST para '/users' com 'name' como 'Felipe' e 'job' como 'QA Engineer'
Então a resposta deve ter o status 201
E o corpo da resposta deve conter um 'id'
E o 'id' do usuário criado deve ser salvo para uso posterior

Cenário CT003 - PUT /users/id atualiza usuário e mede tempo de resposta
Dado que eu tenho acesso à API Reqres
E que eu tenho um 'userId' salvo de um teste anterior
Quando eu faço uma requisição PUT para '/users/userId' com 'name' como 'Felipe Atualizado' e 'job' como 'Especialista QA'
Então a resposta deve ter o status 200
E o 'name' do usuário no corpo da resposta deve ser 'Felipe Atualizado'
E o 'job' do usuário no corpo da resposta deve ser 'Especialista QA'
E o corpo da resposta deve conter um 'updatedAt'
E o tempo de resposta da requisição deve ser menor que 2000ms

Cenário CT004 - Simula falha de rede ou timeout (URL inválida)
Dado que eu tenho uma conexão de rede
Quando eu tento fazer uma requisição GET para uma URL inválida como 'https://reqres.in.br/api/usuarios'
Então uma falha de rede ou erro de timeout deve ser capturado

Cenário CT005 - DELETE /users/999 retorna 204 (usuário pode não existir, mas é aceito)
Dado que eu tenho acesso à API Reqres
Quando eu faço uma requisição DELETE para '/users/999'
Então a resposta deve ter o status 204

Cenário CT006 - Simula erro 404 com ID inexistente no GET
Dado que eu tenho acesso à API Reqres
Quando eu faço uma requisição GET para '/users/9999' (um ID inexistente)
Então a resposta deve ter o status 404

## ✍️ Autor

By **Felipe Eduardo** QA.
