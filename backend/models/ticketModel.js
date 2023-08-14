const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    issue: {
      type: String,
      required: [true, "Select an issue"],
      enum: ['Government Travel Card', 'Voucher', 'Authorization', 'Itinerary', 'Outprocess', 'Inprocess'],
    },

    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },

    status: {
      type: String,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
