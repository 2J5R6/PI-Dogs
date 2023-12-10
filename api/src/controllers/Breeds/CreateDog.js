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

        res.status(201).json(newDog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = CreateDog;
