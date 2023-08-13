const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc   get user tickets
// @route  GET /api/tickets
// @access private
const getTickets = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc   get user ticket
// @route  GET /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// @desc   create new ticket
// @route  POST /api/tickets
// @access private
const createTicket = asyncHandler(async (req, res) => {
  const { issue, description } = req.body;

  if (!issue || !description) {
    res.status(400);
    throw new Error("Please add an issue and description");
  }

  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    issue,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc   delete user ticket
// @route  DELETE /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = await Ticket.findById(req.params.id);
  
    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await ticket.remove()
  
    res.status(200).json({success: true});
  });

  // @desc   update ticket
// @route  PUT /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = await Ticket.findById(req.params.id);
  
    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
  
    res.status(200).json(updateTicket);
  });

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
