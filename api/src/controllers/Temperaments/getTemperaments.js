require('dotenv').config();
const axios = require('axios');
const { Temperaments } = require('../../db');

const { API_KEY } = process.env;

async function getTemperaments(req, res) {
    try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
            headers: { 'x-api-key': API_KEY }
        });

        const temperaments = new Set();
        response.data.forEach(dog => {
            if (dog.temperament) {
                dog.temperament.split(', ').forEach(temp => temperaments.add(temp.trim()));
            }
        });

        await Promise.all(Array.from(temperaments).map(async (tempName) => {
            await Temperaments.findOrCreate({
                where: { name: tempName }
            });
        }));

        const allTemperaments = await Temperaments.findAll();
        res.status(200).json(allTemperaments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getTemperaments;