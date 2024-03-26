const Joi = require('joi');

function validateEvent(event) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.string().isoDate().required(),
    location: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(event);
  return error ? error.details[0].message : null;
}
