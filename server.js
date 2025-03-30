const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar con PostgreSQL (cambia los valores según tu configuración)
const sequelize = new Sequelize('postgresql://postgres:QuzItzlTJzMmGKHuMjAtoIdbJUNZoKBF@crossover.proxy.rlwy.net:16391/railway');

const Name = sequelize.define('Name', {
    name: { type: DataTypes.STRING, allowNull: false }
});

sequelize.sync();