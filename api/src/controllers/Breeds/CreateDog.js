const { Breeds, Temperaments } = require('../../db');

async function CreateDog(req, res) {
    const { name, height, weight, life_span, image, description, temperaments } = req.body;

    try {
        const newDog = await Breeds.create({
            name,
            height: height.metric, // Asegúrate de extraer la propiedad 'metric'
            weight: weight.metric, // Asegúrate de extraer la propiedad 'metric'
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

        if (newDogWithTemperaments) {
            // Estructurar la respuesta
            const formattedDog = newDogWithTemperaments.toJSON();
            res.status(201).json({
                id: formattedDog.id,
                name: formattedDog.name,
                height: formattedDog.height,
                weight: formattedDog.weight,
                life_span: formattedDog.life_span,
                image: formattedDog.image, // Asegúrate de que 'image' sea una URL
                description: formattedDog.description,
                temperaments: formattedDog.Temperaments ? formattedDog.Temperaments.map(t => t.name) : []
            });
        } else {
            // Enviar un error si no se pudo recuperar el perro con temperamentos
            res.status(404).json({ error: "Dog created but not found with temperaments." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = CreateDog;
