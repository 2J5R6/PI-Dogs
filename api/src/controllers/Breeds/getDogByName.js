require('dotenv').config();
const { Op } = require('sequelize');
const axios = require('axios');
const { Breeds, Temperaments } = require('../../db');
const { API_KEY } = process.env;

async function getDogByName(req, res) {
    try {
        const { name } = req.params;
        const localDogs = await Breeds.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: Temperaments
        });

        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
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

        const allDogs = [...localDogs, ...apiDogs];
        res.status(200).json(allDogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getDogByName;