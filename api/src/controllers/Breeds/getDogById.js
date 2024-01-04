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
            const dogFromDb = await Breeds.findByPk(id, {
                include: Temperaments
            });

            if (dogFromDb) {
                return res.status(200).json(dogFromDb);
            }
        } else {
            // Asumimos que el ID es un número y buscamos en la API externa
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
                headers: { 'x-api-key': API_KEY }
            });
            
            if (!apiResponse.data) {
                return res.status(404).json({ message: "No dog breed found with the given ID." });
            }

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
        // Si no se encontró el perro ni en la base de datos ni en la API externa
        return res.status(404).json({ message: "No dog breed found with the given ID." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getDogById;
