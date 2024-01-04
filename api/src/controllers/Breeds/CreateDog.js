const { Breeds, Temperaments } = require('../../db');

async function CreateDog(req, res) {
    const { name, height, weight, life_span, image, description, temperaments } = req.body;

    try {
        const newDog = await Breeds.create({
            name,
            height,
            weight,
            life_span,
            image,
            description
        });

        if (temperaments && temperaments.length > 0) {
            const temperamentInstances = await Promise.all(
                temperaments.map(tempName => 
                    Temperaments.findOrCreate({
                        where: { name: tempName }
                    })
                    .then(data => data[0])
                )
            );

            await newDog.addTemperaments(temperamentInstances);
        }

        // Recuperar el perro recién creado con sus temperamentos asociados
        const newDogWithTemperaments = await Breeds.findByPk(newDog.id, {
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        // Estructurar la respuesta
        const formattedDog = newDogWithTemperaments.toJSON();
        res.status(201).json({
            id: formattedDog.id,
            name: formattedDog.name,
            height: formattedDog.height,
            weight: formattedDog.weight,
            life_span: formattedDog.life_span,
            image: formattedDog.image, // Asegúrate de que image sea una URL
            description: formattedDog.description,
            temperaments: formattedDog.Temperaments.map(t => t.name)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = CreateDog;
