require('dotenv').config();
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');
const { API_KEY } = process.env;
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

async function getDogById(req, res) {
    try {
        const { id } = req.params;

        // Verifica si el ID es un UUID o un número
        if (uuidValidate(id)) {
            // Busca en la base de datos local
            let dogFromDb = await Breeds.findByPk(id, {
                include: {
                    model: Temperaments,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });

            if (dogFromDb) {
                // Estructura la respuesta como la API externa
                dogFromDb = dogFromDb.toJSON(); // Convertir instancia de Sequelize a objeto plano
                const formattedDog = {
                    id: dogFromDb.id,
                    name: dogFromDb.name,
                    height: dogFromDb.height,
                    weight: dogFromDb.weight,
                    life_span: dogFromDb.life_span,
                    image: dogFromDb.image,
                    description: dogFromDb.description,
                    // Asegurarse de que Temperaments existe antes de mapear
                    temperaments: dogFromDb.Temperaments ? dogFromDb.Temperaments.map(t => t.name) : []
                };

                return res.status(200).json(formattedDog);
            }
            // Si el perro no se encontró en la base de datos local, devuelve un error 404
            return res.status(404).json({ message: "No dog breed found with the given ID." });
        } else {
            // Asumimos que el ID es un número y buscamos en la API externa
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
                headers: { 'x-api-key': API_KEY }
            });
            
            if (apiResponse.data) {
                const apiDog = apiResponse.data;
                const ApiImage = `https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`;
                const dog = {
                    id: apiDog.id,
                    name: apiDog.name,
                    height: apiDog.height.metric,
                    weight: apiDog.weight.metric,
                    life_span: apiDog.life_span,
                    image: ApiImage,
                    description: apiDog.description,
                    temperaments: apiDog.temperament ? apiDog.temperament.split(', ').map(temp => temp.trim()) : []
                };

                return res.status(200).json(dog);
            }
        }
        // Si no se encontró el perro ni en la base de datos ni en la API externa
        return res.status(404).json({ message: "No dog breed found with the given ID." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:"An error occurred while retrieving the dog." + error.message });
    }
}

module.exports = getDogById;
