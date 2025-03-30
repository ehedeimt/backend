const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar con PostgreSQL
const sequelize = new Sequelize('postgres://usuario:contraseña@localhost:5432/mi_basedatos');

const Name = sequelize.define('Name', {
    name: { type: DataTypes.STRING, allowNull: false }
});

sequelize.sync();

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

app.get('/api/names', async (req, res) => {
    try {
        const names = await Name.findAll();
        res.json({ data: names });
    } catch (error) {
        console.error('Error al obtener los nombres:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
