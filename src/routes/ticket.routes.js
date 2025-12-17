import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket/ticket.controller.js";

// Middleware imports
import { authMiddleware } from "../middlewares/auth/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

// DTO imports
import { createTicketDto, updateTicketDto } from "../dto/tickets.dto.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create category (with limit check)
router.post("/", validate(createTicketDto), createTicket);

// Get all categories
router.get("/", getTickets);

// Get category by ID
router.get("/:id", getTicketById);

// Update category by ID
router.put("/:id", validate(updateTicketDto), updateTicket);

// Delete category by ID
router.delete("/:id", deleteTicket);

export default router;
