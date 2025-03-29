const express = require("express");
const axios = require("axios");

const app = express();
const port = 5000;

app.get("/api/estaciones", async (req, res) => {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlYm1hcnJlcm90QGdtYWlsLmNvbSIsImp0aSI6IjBiNzNiZmI0LTkyM2QtNGI1OC1hNjMyLTM1NzVkMDA2MTdjMCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzQzMjg0MjgxLCJ1c2VySWQiOiIwYjczYmZiNC05MjNkLTRiNTgtYTYzMi0zNTc1ZDAwNjE3YzAiLCJyb2xlIjoiIn0.JHFhWowiwsekQEkGG3FYLg_YDnR5XBgm6NsQ8zSE6zE"; // Reemplaza con tu clave de API
    const url = "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones";

    try {
        const response = await axios.get(url, {
            headers: { "api_key": apiKey }
        });

        const dataUrl = response.data.datos;  // Obtener la URL de los datos

        // Realizar una segunda solicitud para obtener los datos reales
        const estacionesResponse = await axios.get(dataUrl);
        res.json(estacionesResponse.data);
    } catch (error) {
        console.error("Error al obtener datos de AEMET:", error);
        res.status(500).send("Hubo un error al obtener los datos.");
    }
});

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
