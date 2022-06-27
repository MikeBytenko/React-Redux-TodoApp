const validation = (schema, field = "body") => {
  return (req, res, next) => {
    field = req[field];
    const { error } = schema.validate(field);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const errorDetail = details.map((i) => i.message);
      res.status(400).json({
        status: false,
        error: errorDetail,
      });
    }
  };
};

module.exports = { validation }