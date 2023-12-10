const { Router } = require('express');
// Importar todos los controladores;

const {
    getAllDogs,
    getDogById,
    getDogByName,
    CreateDog,
    getTemperaments

} = require('../controllers/Allcontrollers')


const router = Router();

//* Breed routes

router.get('/dogs', getAllDogs)
router.get('/dogs/:id', getDogById)
router.get('/dogs/name/:name', getDogByName)
router.post('/dogs', CreateDog)

// //* Temperament routes

router.get('/temperaments', getTemperaments)




module.exports = router;
