require('dotenv').config();
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');
// const getLocalDogs = require('../../middlewares/Breeds/getLocalDogs')
const { API_KEY } = process.env;

async function getAllDogs(req, res){
    try {
        let allDogs = await Breeds.findAll({
            include: Temperaments
        });

        // If there are less than 24 dogs in our database, fill in with API data
        if (allDogs.length < 24) {
            const apiUrl = 'https://api.thedogapi.com/v1/breeds';
            const apiResponse = await axios.get(apiUrl, {
                headers: { 'x-api-key': API_KEY }
            });
            const apiDogs = apiResponse.data.slice(0, 24 - allDogs.length);

            for (const dog of apiDogs) {
                let [breed, created] = await Breeds.findOrCreate({
                    where: { name: dog.name },
                    defaults: {
                        id: dog.id,
                        image: dog.image?.url,
                        name: dog.name,
                        height: dog.height.metric,
                        weight: dog.weight.metric,
                        life_span: dog.life_span
                    }
                });

                if (created && dog.temperament) {
                    let temperaments = dog.temperament.split(', ').map(t => t.trim());
                    for (const tempName of temperaments) {
                        let [temp, tempCreated] = await Temperaments.findOrCreate({
                            where: { name: tempName }
                        });
                        if (tempCreated) {
                            await breed.addTemperament(temp);
                        }
                    }
                }
            }

            // Refetch all dogs after insertion
            allDogs = await Breeds.findAll({
                include: Temperaments
            });
        }

        res.status(200).json(allDogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllDogs;