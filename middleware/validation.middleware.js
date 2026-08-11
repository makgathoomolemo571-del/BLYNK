module.exports = (schema, source = "body") => {

    return (req, res, next) => {

        try {

          const { error, value } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
    convert: true
});

if (error) {
    console.log("========== VALIDATION ERROR ==========");
    console.log(req[source]);
    console.log(error.details);
console.log("REQUEST BODY:", req.body);
console.log("VALIDATION ERROR:", error.details);
    return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map(item => ({
            field: item.path.join("."),
            message: item.message
        }))
    });
}

            req[source] = value;

            next();

        } catch (err) {

            next(err);

        }

    };

};