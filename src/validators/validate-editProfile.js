import Joi from "joi";

const editProfileSchema = Joi.object({
  firstName: Joi.string().max(50).required().messages({
    "string.empty": "first name is required",
    "string.base": "first name must be a string",
    "string.max": "FirstName must be no more than 50 characters long"
  }),
  lastName: Joi.string().max(50).required().messages({
    "string.empty": "last naem is required",
    "string.base": "last name must be a string",
    "string.max": "LastName must be no more than 50 characters long"
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "email is required",
    "string.email": "email must be a valid email address"
  })
  // mobile: Joi.string().required().length(10).pattern(/^\d+$/).messages({
  //   "string.empty": "mobile phone is required",
  //   "string.pattern.base": "mobile phone must be a number",
  //   "string.length": "mobile phone must be exactly 10 digits",
  //   "string.base": "mobile must be a string"
  // })
});

const validateEditProfile = input => {
  const { error } = editProfileSchema.validate(input, {
    abortEarly: false
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateEditProfile;
