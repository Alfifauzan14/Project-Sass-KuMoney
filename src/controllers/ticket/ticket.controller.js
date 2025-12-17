import * as ticketDatasource from "../../datasource/ticket.datasource.js";

/**
 * Create new account
 */
export const createTicket = async (req, res) => {
  const { subject, messege } = req.body;

  try {
    const ticketData = {
      createdBy: {
        _id: req.user.id,
        email: req.user.email,
      },
      subject,
      messege,
    };

    const ticket = await ticketDatasource.createTicket(ticketData);

    res.status(201).json({
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({
      message: error.message,
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Get all accounts for current user
 */
export const getTickets = async (req, res) => {
  try {
    const tickets = await ticketDatasource.findTicketsByUserId(req.user.id);

    res.status(200).json({
      data: tickets,
      total: tickets.length,
    });
  } catch (error) {
    console.error("Get Tickets Error:", error);
    res.status(500).json({
      message: error.message,
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Get account by ID
 */
export const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await ticketDatasource.findTicketByIdAndUserId(
      id,
      req.user.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
        code: "TICKET_NOT_FOUND",
      });
    }

    res.status(200).json({
      data: ticket,
    });
  } catch (error) {
    console.error("Get Ticket By ID Error:", error);
    res.status(500).json({
      message: error.messege,
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Update account by ID
 */
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { subject, messege } = req.body;

  try {
    const updateData = {};

    if (subject !== undefined) updateData.subject = subject;
    if (messege !== undefined) updateData.messege = messege;

    const ticket = await ticketDatasource.updateTicketById(
      id,
      req.user.id,
      updateData
    );

    if (!ticket) {
      return res.status(404).json({
        messege: "Ticket not found",
        code: "TICKET_NOT_FOUND",
      });
    }

    res.status(200).json({
      messege: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({
      messege: error.message,
      code: "INTERNAL_ERROR",
    });
  }
};

/**
 * Delete account by ID
 */
export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    // Get account first to get the name
    const ticket = await ticketDatasource.findTicketByIdAndUserId(
      id,
      req.user.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
        code: "TICKET_NOT_FOUND",
      });
    }

    // Delete account
    await ticketDatasource.deleteTicketById(id, req.user.id);

    res.status(200).json({
      message: "Ticket deleted successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Delete Ticket Error:", error);
    res.status(500).json({
      message: error.message,
      code: "INTERNAL_ERROR",
    });
  }
};
