function validateCreateDog(req, res, next) {
    const { name, height, weight, life_span, image, description, temperaments } = req.body;

    if (!name || !height || !weight || !life_span) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    if (typeof name !== 'string' || typeof life_span !== 'string') {
        return res.status(400).json({ error: "Invalid data types for name or life_span." });
    }

    // Validaciones adicionales para 'height' y 'weight'
    if (typeof height !== 'object' || typeof weight !== 'object') {
        return res.status(400).json({ error: "Height and weight must be objects." });
    }

    if (!height.metric || !weight.metric) {
        return res.status(400).json({ error: "Height and weight must include metric values." });
    }

    // Validaciones para 'temperaments'
    if (temperaments && !Array.isArray(temperaments)) {
        return res.status(400).json({ error: "Temperaments must be an array." });
    }

    // Validación opcional para 'image' y 'description'
    if (image && typeof image !== 'string') {
        return res.status(400).json({ error: "Invalid URL for image." });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: "Description must be a string." });
    }

    next();
}

module.exports = validateCreateDog;