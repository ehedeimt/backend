const express = require('express');
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
