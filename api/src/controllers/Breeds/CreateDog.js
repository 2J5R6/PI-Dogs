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

            // Imprimir para depuración
console.log(`Temperaments added to the dog: ${temperamentInstances.map(t => t.name).join(', ')}`);
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
            console.log(`Retrieved dog with temperaments: ${JSON.stringify(newDogWithTemperaments, null, 2)}`);
            // Estructurar la respuesta
            const temperamentsArray = newDogWithTemperaments.Temperaments ? newDogWithTemperaments.Temperaments.map(t => t.name) : [];

            res.status(201).json({
                id: newDogWithTemperaments.id,
                name: newDogWithTemperaments.name,
                height: newDogWithTemperaments.height,
                weight: newDogWithTemperaments.weight,
                life_span: newDogWithTemperaments.life_span,
                image: newDogWithTemperaments.image,
                description: newDogWithTemperaments.description,
                temperaments: temperamentsArray
            });
        } else {
            console.log("No dog was found after creation.");
            // Enviar un error si no se pudo recuperar el perro con temperamentos
            res.status(404).json({ error: "Dog created but not found with temperaments." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = CreateDog;
