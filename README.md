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


## ✍️ Autor

By **Felipe Eduardo** QA.
