const express = require('express');
const router = express.Router();

//RUTA PARA EL REGISTRO DEL USUARIO
router.post('/usuarios', (req, res) => {
  const { nombre, email, password } = req.body;

  //COMPROBAR ESTO PRIMIERO Y LUEGO REGISTRAR EN BBDD
  console.log('Usuario recibido:', { nombre, email, password });

  res.status(201).json({ message: 'Usuario creado exitosamente' });
});

module.exports = router;

