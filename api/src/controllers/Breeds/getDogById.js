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
            
            if (!apiResponse.data) {
                return res.status(404).json({ message: "No dog breed found with the given ID." });
            }

            const apiDog = apiResponse.data;
            ApiImage = ('https://cdn2.thedogapi.com/images/')+apiDog.reference_image_id+('.jpg'); 
            dog = {
                id: apiDog.id,
                name: apiDog.name,
                height: apiDog.height.metric,
                weight: apiDog.weight.metric,
                life_span: apiDog.life_span,
                image: ApiImage,
                description: apiDog.description,
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