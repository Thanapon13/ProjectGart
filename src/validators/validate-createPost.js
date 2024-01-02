import Joi from "joi";

const createPostSchema = Joi.object({
  title: Joi.string().trim().max(255).required().messages({
    "string.empty": "post name is required",
    "string.max": "Post titles must be no more than 255 characters long"
  }),
  description: Joi.string().trim().max(255).required().messages({
    "string.empty": "description is required",
    "string.max": "Description Post must be no more than 255 characters long"
  }),

  tagId: Joi.string().required().messages({
    "string.empty": "tag name is required"
  }),
  image: Joi.array()
    .items(
      Joi.object({
        image: Joi.any()
          .required()
          .messages({ "any.required": "image is required" })
      })
    )
    .required()
    .messages({
      "array.base": "image is required"
    })
});

const validateCreatePost = input => {
  const { error } = createPostSchema.validate(input, {
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

export default validateCreatePost;
