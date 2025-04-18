/*const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', usuarioRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/

// index.js
const express = require('express');
const app = express();

// Middleware para poder recibir datos en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta POST /api/usuarios para recibir datos de registro
app.post('/api/usuarios', (req, res) => {
    const { nombre, email, password } = req.body;

    // Verificación básica de que los campos no estén vacíos
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    console.log('Usuario recibido:', { nombre, email, password });

    // Simula una respuesta exitosa
    res.status(201).json({ message: 'Usuario creado correctamente' });
});

// Definir el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

