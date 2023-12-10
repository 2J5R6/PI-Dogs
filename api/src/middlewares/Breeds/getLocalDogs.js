// const { Breeds, Temperaments } = require('../../db'); 

// const getLocalDogs = async () => {
//   return await Breeds.findAll({
//     include: [
//       {
//         model: Temperaments,
//         attributes: ['name'],
//         through: {
//           attributes: [],
//         }
//       }
//     ]
//   });
// };

// module.exports = getLocalDogs;