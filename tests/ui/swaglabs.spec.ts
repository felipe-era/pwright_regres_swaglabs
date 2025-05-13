import { test, expect } from '@playwright/test';

test.describe('UI Tests', () => {

    test('CT001 - Login com credenciais válidas', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('CT002 - Login com credenciais inválidas', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'usuario_invalido');
        await page.fill('[data-test="password"]', 'senha_errada');
        await page.click('[data-test="login-button"]');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match');
    });

    test('CT003 - Adicionar e remover produtos do carrinho', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
    
        // Adiciona 3 produtos
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    
        // Remove 2 produtos
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        await page.click('[data-test="remove-sauce-labs-bike-light"]');
    
        // Valida carrinho com 1 item
        await page.click('.shopping_cart_link');
        const items = await page.locator('.cart_item').all();
        expect(items.length).toBe(1);
    
        // Valida nome do item restante
        await expect(items[0].locator('.inventory_item_name')).toHaveText('Sauce Labs Bolt T-Shirt');
      });

      test('CT003.1 - Adicionar e remover produtos dinamicamente', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
      
        // Seleciona todos os botões "Add to cart"
        const botoesAdd = await page.$$('button.btn_inventory');
      
        // Adiciona os 3 primeiros produtos
        for (let i = 0; i < 3; i++) {
          await botoesAdd[i].click();
        }
      
        // Agora remove os 2 primeiros produtos clicando nos botões "Remove"
        const botoesRemove = await page.$$('button.btn_secondary');
        for (let i = 0; i < 2; i++) {
          await botoesRemove[i].click();
        }
      
        // Vai para o carrinho
        await page.click('.shopping_cart_link');
      
        // Valida que sobrou apenas 1 item
        const itens = await page.locator('.cart_item').all();
        expect(itens.length).toBe(1);
      
        // Pega o nome do item restante e mostra no log (debug)
        const nomeItem = await itens[0].locator('.inventory_item_name').textContent();
        console.log('Produto restante no carrinho:', nomeItem);
      });
    
      test('CT004 - Simular erro no checkout sem preencher dados obrigatórios', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
    
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');
    
        // Tentar continuar sem preencher campos obrigatórios
        await page.click('[data-test="continue"]');
    
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Error: First Name is required');
      });

});
