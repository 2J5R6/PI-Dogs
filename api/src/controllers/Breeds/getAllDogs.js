require('dotenv').config();
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');
// const getLocalDogs = require('../../middlewares/Breeds/getLocalDogs')
const { API_KEY } = process.env;

async function getAllDogs(req, res){
    try {
        // Fetch dogs from the local database
        const localDogs = await Breeds.findAll({
            include: Temperaments
        });

        // Fetch dogs from the API
        const apiUrl = 'https://api.thedogapi.com/v1/breeds';
        const apiResponse = await axios.get(apiUrl, {
            headers: { 'x-api-key': API_KEY }
        });
        const apiDogs = apiResponse.data.map(dog => ({
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image?.url,
            temperaments: dog.temperament ? dog.temperament.split(', ').map(temp => temp.trim()) : []
        }));

        // Combine local and API dogs
        const allDogs = [...localDogs, ...apiDogs];

        res.status(200).json(allDogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllDogs;