function validateDogName(req, res, next) {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ error: "Name parameter is required." });
    }

    if (typeof name !== 'string') {
        return res.status(400).json({ error: "Name must be a string." });
    }

    next();
}

module.exports = validateDogName;