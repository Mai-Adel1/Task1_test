const { Event } = require('../models/event');
const Joi = require('joi');
const { validateEvent } = require('../helper/validation'); 

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).send(allEvents);
  } catch (error) {
    res.status(400).send(error); 
  }
};
