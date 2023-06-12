const {body, validationResult} = require('express-validator');

const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().notEmpty().withMessage('Description must not be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            const validationErrors = {};
            // Store validation errors in flash messages
            errors.array().forEach(error => {
                req.flash('errorMsg', error.msg);
                validationErrors[error.path] = error.msg;
            });

            // Store input values in flash messages or session
            req.flash('inputValues', req.body);

            // Store validation errors in flash messages or session
            req.flash('validationErrors', validationErrors);

            return res.redirect('back');
        }
        next();
    }
];

module.exports = {validateTask};