// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Habilita CORS para permitir peticiones desde tu frontend (donde sea que esté)
app.use(cors());

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta POST para recibir los datos del formulario
app.post('/api/usuarios', (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    console.log('📥 Nuevo registro recibido:', { nombre, email });

    res.status(201).json({ mensaje: '✅ Usuario registrado con éxito' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Backend corriendo en el puerto ${PORT}`);
});
