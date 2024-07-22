const validateFiles = (req, res, next) => {
    if (!req.files['profile'] || !req.files['serviceBill'] || !req.files['product']) {
        return res.status(400).json({ message: 'Todos los documentos son requeridos para pasar a premium.' });
    }
    next();
};

export default validateFiles;
