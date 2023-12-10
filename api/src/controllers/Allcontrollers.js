const getAllDogs = require('./Breeds/getAllDogs')
const getDogById = require('./Breeds/getDogById')
const getDogByName = require('./Breeds/getDogByName')
const CreateDog = require('./Breeds/CreateDog')

const getTemperaments = require('./Temperaments/getTemperaments')

module.exports = {
    getAllDogs,
    getDogById,
    getDogByName,
    CreateDog,
    getTemperaments
}
