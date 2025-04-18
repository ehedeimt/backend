const express = require('express');
const router = express.Router();

// Ruta POST /api/usuarios
router.post('/usuarios', (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    console.log('➡️ Usuario recibido:', { nombre, email, password });

    // Simulación de respuesta exitosa
    res.status(201).json({ message: 'Usuario creado correctamente' });
});

module.exports = router;
