require('dotenv').config();
const axios = require('axios');
const { Breeds } = require('../../db');

const { API_KEY } = process.env;

async function getDogById(req, res, next){
    const { genre, order, source } = req.query;

};

module.exports = getDogById;