import Ticket from "../models/Ticket.model.js";

/**
 * Create new account
 */
export const createTicket = async (ticketData) => {
  return await Ticket.create(ticketData);
};

/**
 * Find ticket by ID
 */
export const findTicketById = async (ticketId) => {
  return await Ticket.findById(ticketId);
};

/**
 * Find account by ID and user ID
 */
export const findTicketByIdAndUserId = async (ticketId, userId) => {
  return await Ticket.findOne({
    _id: ticketId,
    "createdBy._id": userId,
  });
};

/**
 * Find all accounts by user ID
 */
export const findTicketsByUserId = async (userId) => {
  return await Ticket.find({ "createdBy._id": userId }).sort({
    createdAt: -1,
  });
};

/**
 * Count accounts by user ID
 */
export const countTicketsByUserId = async (userId) => {
  return await Ticket.countDocuments({ "createdBy._id": userId });
};

/**
 * Update account by ID
 */
export const updateTicketById = async (ticketId, userId, updateData) => {
  return await Ticket.findOneAndUpdate(
    { _id: ticketId, "createdBy._id": userId },
    updateData,
    { new: true }
  );
};

/**
 * Delete account by ID
 */
export const deleteTicketById = async (ticketId, userId) => {
  return await Ticket.findOneAndDelete({
    _id: ticketId,
    "createdBy._id": userId,
  });
};
