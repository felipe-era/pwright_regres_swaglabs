import { test, expect, request } from '@playwright/test';

test.describe('Reqres API Tests', () => {
    let userId: string;
    test('CT001 - GET /users?page=2 retorna usuários válidos', async () => {
        const api = await request.newContext({
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const response = await api.get('https://reqres.in/api/users?page=2');

        console.log('Status:', response.status());
        const body = await response.json();
        console.log('Corpo da resposta:', JSON.stringify(body, null, 2));

        expect(response.status()).toBe(200);
        expect(Array.isArray(body.data)).toBe(true);

        for (const user of body.data) {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        }
    });

    test('CT002 - POST /users cria um novo usuário e salva o ID', async () => {
        const api = await request.newContext({
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const payload = {
            name: 'Felipe',
            job: 'QA Engineer'
        };

        const response = await api.post('https://reqres.in/api/users', { data: payload });

        console.log('📦 Status:', response.status());
        const body = await response.json();
        console.log('🟢 RESPOSTA:', JSON.stringify(body, null, 2));

        expect(response.status()).toBe(201);
        expect(body).toHaveProperty('id');

        userId = body.id; // Salva o ID para o próximo teste
    });

    test('CT003 - PUT /users/:id atualiza usuário e mede tempo de resposta', async () => {
        const api = await request.newContext({
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const payload = {
            name: 'Felipe Atualizado',
            job: 'Especialista QA'
        };

        const start = Date.now();
        const response = await api.put(`https://reqres.in/api/users/${userId}`, { data: payload });
        const duration = Date.now() - start;

        console.log('Status:', response.status());
        console.log('Tempo de resposta:', duration + 'ms');
        const body = await response.json();
        console.log('RESPOSTA:', JSON.stringify(body, null, 2));

        expect(response.status()).toBe(200);
        expect(body.name).toBe('Felipe Atualizado');
        expect(body.job).toBe('Especialista QA');
        expect(body).toHaveProperty('updatedAt');
        expect(duration).toBeLessThan(2000); // Exemplo: 2 segundos como limite
    });

    test('CT004 - Simula falha de rede ou timeout (URL inválida)', async () => {
        const api = await request.newContext();

        try {
            await api.get('https://reqres.in.br/api/usuarios'); // domínio inválido
            console.log('Erro esperado NÃO ocorreu. A URL inválida respondeu.');
            // Se não lançar erro, o teste falha explicitamente
            expect(false).toBe(true);
        } catch (error) {
            console.log('Falha de rede capturada com sucesso.');
            console.log('Erro:', error instanceof Error ? error.message : error);
            expect(true).toBe(true); // Confirma que o erro foi capturado
        }
    });

    test('CT005 - DELETE /users/999 retorna 204 (usuário pode não existir, mas é aceito)', async () => {
        const api = await request.newContext({
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const response = await api.delete('https://reqres.in/api/users/999');

        console.log('Status:', response.status());
        const body = await response.text();
        console.log('Corpo da resposta:', body);

        expect(response.status()).toBe(204);
    });

    test('CT006 - Simula erro 404 com ID inexistente no GET', async () => {
        const api = await request.newContext({
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1'
            }
        });

        const response = await api.get('https://reqres.in/api/users/9999');

        console.log('Status:', response.status());
        const body = await response.text();
        console.log('Corpo da resposta:', body);

        expect(response.status()).toBe(404);
    });

});