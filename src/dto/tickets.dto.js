import Joi from "joi";

/**
 * DTO for creating account
 */
export const createTicketDto = Joi.object({
  subject: Joi.string().required().trim().min(1).max(50).messages({
    "string.base": "Subject must be a string",
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 1 character",
    "string.max": "Subject must not exceed 50 characters",
    "any.required": "Subject is required",
  }),
  messege: Joi.string().required().trim().messages({
    "string.base": "Messege must be a string",
    "string.empty": "Messege is required",
    "any.required": "Messege is required",
  }),
});

/**
 * DTO for updating account
 */
export const updateTicketDto = Joi.object({
  subject: Joi.string().optional().trim().min(1).max(50).messages({
    "string.base": "Subject must be a string",
    "string.min": "Subject must be at least 1 character",
    "string.max": "Subject must not exceed 50 characters",
  }),
  messege: Joi.string().optional().trim().messages({
    "string.base": "Messege must be a string",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
