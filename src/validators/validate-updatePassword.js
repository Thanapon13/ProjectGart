import Joi from "joi";

const updatePassword = Joi.object({
  newPassword: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password must have at least 6 characters"
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is required"
    })
});

const validateUpdatePassword = input => {
  const { error } = updatePassword.validate(input, {
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

export default validateUpdatePassword;
