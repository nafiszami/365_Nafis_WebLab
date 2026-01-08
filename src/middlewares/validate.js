const validate = (schema) => (req, res, next) => {
    // Ensure body is present and parsed (helps when Content-Type is missing or invalid)
    if (req.body == null) {
        return res.status(400).json({
            status: 'fail',
            errors: [{ field: 'body', message: 'Request body must be valid JSON' }]
        });
    }

    const result = schema.safeParse(req.body);
    console.log('[DEBUG] Validation result:', result);
    if (!result.success) {
        return res.status(400).json({
            status: 'fail',
            errors: result.error.errors.map(e => ({ field: e.path && e.path.length ? e.path.join('.') : 'body', message: e.message }))
        });
    }
    req.body = result.data;
    next();
};
module.exports = validate;

