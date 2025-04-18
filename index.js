const cors = require('cors');
const express = require('express');
const app = express();

//IMPORTANTE: permitir tu dominio (o todos con '*')
app.use(cors({
  origin: 'https://eimtcms.eimt.uoc.edu'  // ← mi frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aquí va tu ruta
app.post('/api/usuarios', (req, res) => {
  const { nombre, email, password } = req.body;
  console.log({ nombre, email, password });
  res.status(201).json({ mensaje: '✅ Usuario registrado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en el puerto ${PORT}`);
});
