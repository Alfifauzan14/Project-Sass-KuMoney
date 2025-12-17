import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    createdBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    messege: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema, "tickets");

export default Ticket;
