require('dotenv').config();
const axios = require('axios');
const { Temperaments } = require('../../db');

const { API_KEY } = process.env;

async function getTemperaments(req, res, next){
    const { genre, order, source } = req.query;

};

module.exports = getTemperaments;