const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://eimtcms.eimt.uoc.edu', //dominio frontend exacto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tus rutas
app.use('/api', require('./routes/usuarios'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
