const request = require('supertest')
const server = require('../../index');

//En caso de usar token propio, reemplazar aquí
const tokenDePrueba = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1LCJhZG1pbmlzdHJhZG9yIjoxLCJlbWFpbCI6InBhb2xvbGFuZGVyb3NAZ21haWwuY29tIiwiaWF0IjoxNjkwMzE3NDcxfQ.3gX-f6NcIbUMlfe0970tNqQJLr_7aQaGK7p-4147J2I'

describe('Operaciones CRUD de productos', () => {
    it('Prueba de registro de nuevo usuario y mensaje de status 201 exitoso', async () => {
        const usuario = {
            nombre: 'Pedro', //Reemplazar por un nombre valido
            apellido: 'Pascal', //Reemplazar por un apellido valido
            email: 'pedritopascal@gmail.com', //Reemplazar por un email valido
            direccion: 'Hollywood', //Reemplazar por una direccion valida
            telefono: '123456789', //Reemplazar por un telefono valido
            contrasena: 'thisIsTheWay', //Reemplazar por una contraseña valida
        };

        const response = await request(server)
            .post('/registrar')
            .send(usuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Usuario creado con éxito');
    });

    it('Prueba de login de usuario registrado, envío de token y status 200 exitoso', async () => {
        const response = await request(server)
            .post('/iniciar_sesion')
            .send({ email: 'pedritopascal@gmail.com', contrasena: 'thisIsTheWay' }); //Reemplazar por usuario y contraseña valida

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    it('Prueba para obtener el objeto con los datos de un usuario', async () => {
        const token = tokenDePrueba // Reemplazar por un token valido
        const response = await request(server)
            .get('/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.body).toBeInstanceOf(Object);
    })

    it('Prueba para obtener un arreglo de productos que no sea nulo ni vacio y status 200 exitoso', async () => {
        const token = tokenDePrueba // Reemplazar por un token valido
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