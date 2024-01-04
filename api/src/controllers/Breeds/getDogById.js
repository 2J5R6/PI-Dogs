require('dotenv').config();
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');
const { API_KEY } = process.env;
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

async function getDogById(req, res) {
    try {
        const { id } = req.params;

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
                dogFromDb = dogFromDb.toJSON();
                return res.status(200).json({
                    id: dogFromDb.id,
                    name: dogFromDb.name,
                    height: dogFromDb.height,
                    weight: dogFromDb.weight,
                    life_span: dogFromDb.life_span,
                    image: dogFromDb.image,
                    description: dogFromDb.description,
                    temperaments: dogFromDb.Temperaments ? dogFromDb.Temperaments.map(t => t.name) : []
                });
            } else {
                return res.status(404).json({ message: "No dog breed found with the given ID." });
            }
        } else {
            // Asumimos que el ID es un número y buscamos en la API externa
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
                headers: { 'x-api-key': API_KEY }
            });

            if (apiResponse.data) {
                const apiDog = apiResponse.data;
                const ApiImage = `https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`;
                return res.status(200).json({
                    id: apiDog.id,
                    name: apiDog.name,
                    height: apiDog.height.metric,
                    weight: apiDog.weight.metric,
                    life_span: apiDog.life_span,
                    image: ApiImage,
                    description: apiDog.description,
                    temperaments: apiDog.temperament ? apiDog.temperament.split(', ').map(temp => temp.trim()) : []
                });
            }
        }
        return res.status(404).json({ message: "No dog breed found with the given ID." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the dog." + error.message });
    }
}

module.exports = getDogById;
