require('dotenv').config();
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');

const { API_KEY } = process.env;

async function getDogById(req, res) {
    try {
        const { id } = req.params;
        let dog = await Breeds.findByPk(id, {
            include: Temperaments
        });

        if (!dog) {
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
                headers: { 'x-api-key': API_KEY }
            });

            const apiDog = apiResponse.data;
            dog = {
                id: apiDog.id,
                name: apiDog.name,
                height: apiDog.height.metric,
                weight: apiDog.weight.metric,
                life_span: apiDog.life_span,
                image: apiDog.image?.url,
                temperaments: apiDog.temperament ? apiDog.temperament.split(', ').map(temp => temp.trim()) : []
            };
        }

        res.status(200).json(dog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getDogById;