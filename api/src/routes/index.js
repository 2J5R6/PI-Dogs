const { Router } = require('express');
// Importar todos los controladores;
const {
    getAllDogs,
    getDogById,
    getDogByName,
    CreateDog,
    getTemperaments

} = require('../controllers/Allcontrollers')

//Importar todas las validaciones
const {
    validateDogId,
    validateDogName,
    validateCreateDog
} = require('../middlewares/allmiddlewares')


const router = Router();

//* Breed routes

router.get('/dogs', getAllDogs)
router.get('/dogs/:id', validateDogId, getDogById)
router.get('/dogs/name/:name', validateDogName, getDogByName)
router.post('/dogs', validateCreateDog, CreateDog)

// //* Temperament routes

router.get('/temperaments', getTemperaments)




module.exports = router;
