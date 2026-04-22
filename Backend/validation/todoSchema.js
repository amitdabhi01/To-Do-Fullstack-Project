import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title cannot be empty",
    "string.max": "Title cannot exceed 200 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().max(1000).default("").allow("").messages({
    "string.max": "Description cannot exceed 1000 characters",
  }),

  completed: Joi.boolean().default(false),
});

const createTodoSchema = todoSchema.fork(["title"], (field) =>
  field.required(),
);

const updateTodoSchema = todoSchema.fork(
  ["title", "description", "completed"],
  (field) => field.optional(),
);

export { todoSchema, createTodoSchema, updateTodoSchema };
