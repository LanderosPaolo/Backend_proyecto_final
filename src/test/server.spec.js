const request = require('supertest')
const server = require('../../index');

describe('Operaciones CRUD de productos', () => {
    it('Obteniendo un status 200', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1LCJhZG1pbmlzdHJhZG9yIjoxLCJlbWFpbCI6InBhb2xvbGFuZGVyb3NAZ21haWwuY29tIiwiaWF0IjoxNjkwMjQ3OTU0fQ.DIic4usyN_VISlBO40nvHLMqrVLz3NPHim7Sp9fEaDQ' // Reemplazar por un token valido
        const response = await request(server)
            .get('/productos')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toBe(200)
    })

    it('Prueba de login de usuario registrado y envío de token que existe', async () => {
        // Simula una solicitud POST a /login con el email y el password en el body
        const response = await request(server)
            .post('/iniciar_sesion')
            .send({ email: 'paololanderos@gmail.com', contrasena: '1234' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });
})