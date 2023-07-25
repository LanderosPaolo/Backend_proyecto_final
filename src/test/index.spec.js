const request = require('supertest')
const server = require('../../index');

describe('Operaciones CRUD de productos', () => {
    it('Debería registrar un nuevo usuario y devolver una respuesta exitosa', async () => {
        const usuario = {
            nombre: '', //Reemplazar por un nombre valido
            apellido: '', //Reemplazar por un apellido valido
            email: '', //Reemplazar por un email valido
            direccion: '', //Reemplazar por una direccion valida
            telefono: '', //Reemplazar por un telefono valido
            contrasena: '', //Reemplazar por una contraseña valida
        };

        const response = await request(server)
            .post('/registrar')
            .send(usuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Usuario creado con éxito');
    });

    it('Prueba de login de usuario registrado y envío de token que existe', async () => {
        const response = await request(server)
            .post('/iniciar_sesion')
            .send({ email: '', contrasena: '' }); //Reemplazar por usuario y contraseña valida

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    it('Prueba para obtener los datos de registro de un usuario', async () => {
        const token = '' // Reemplazar por un token valido
        const response = await request(server)
            .get('/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.body).toBeInstanceOf(Object);
    })

    it('Obteniendo un status 200', async () => {
        const token = '' // Reemplazar por un token valido
        const response = await request(server)
            .get('/productos')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
})