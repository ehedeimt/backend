const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar con PostgreSQL
const sequelize = new Sequelize('postgresql://postgres:QuzItzlTJzMmGKHuMjAtoIdbJUNZoKBF@crossover.proxy.rlwy.net:16391/railway');

// Definir el modelo Name
const Name = sequelize.define('Name', {
    name: { type: DataTypes.STRING, allowNull: false }
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
  });

// Intentar sincronizar la base de datos
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada correctamente');
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });

// Ruta POST para guardar un nombre
app.post('/api/names', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'El nombre no puede estar vacío' });
        }

        const newName = await Name.create({ name: name.trim() });
        res.json({ message: 'Nombre guardado correctamente', data: newName });
    } catch (error) {
        console.error('Error al guardar el nombre:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
});

// Ruta GET para obtener todos los nombres
app.get('/api/names', async (req, res) => {
    try {
        const names = await Name.findAll();
        res.json({ data: names });
    } catch (error) {
        console.error('Error al obtener los nombres:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
