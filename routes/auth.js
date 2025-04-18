const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

// REGISTRO
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)',
            [nombre, email, hashedPassword]
        );
        res.status(201).send('Usuario registrado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar');
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) return res.status(400).send('Usuario no encontrado');

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(401).send('Contraseña incorrecta');

        res.send('Inicio de sesión correcto');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
});

module.exports = router;
