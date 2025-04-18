const express = require('express');
const router = express.Router();

// Ruta POST /api/usuarios
router.post('/', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Aquí puedes guardar en la base de datos si tienes Sequelize configurado
  return res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: { nombre, email } });
});

module.exports = router;
