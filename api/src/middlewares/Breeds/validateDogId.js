function validateDogId(req, res, next) {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: "Invalid ID provided." });
    }

    next();
}

module.exports = validateDogId;