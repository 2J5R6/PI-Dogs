function validateDogId(req, res, next) {
    const { id } = req.params;

    // Permite que pase si es un número (ID de la API) o un UUID (base de datos local)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!id || (!uuidRegex.test(id) && isNaN(parseInt(id)))) {
        return res.status(400).json({ error: "Invalid ID provided." });
    }

    next();
}

module.exports = validateDogId;
